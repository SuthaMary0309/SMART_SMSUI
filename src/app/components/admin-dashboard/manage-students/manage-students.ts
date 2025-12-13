import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Service/student-service';
import { FormsModule } from '@angular/forms';
import { inject } from '@angular/core/primitives/di';
import {  HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-manage-students',
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './manage-students.html',
  styleUrl: './manage-students.css',
  standalone:true
  
  
})
export class ManageStudents implements OnInit {
  constructor(private studentService:StudentService){
    
  } 

  students: any[] = [];
  student: any = {
    studentName: '',
    phoneNo: '',
    address: '',
    email: '',
    userID: '',
    classID: ''
  };

  editMode: boolean = false;
  editID: string = '';
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  ngOnInit(): void {
    console.log('Manage ComponentLoaded')
    this.loadStudents();

   
  }

  loadStudents() {
    this.studentService.getAll().subscribe(  {
      next: (res: any) => {
      this.students = res;
    },
     error: (err:any) => {
      console.error("Failed to load students", err);
    }
    });
  }
  
  

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, or WebP)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      this.selectedImage = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveStudent() {
    if (!this.student.studentName || !this.student.email || !this.student.address || !this.student.phoneNo) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      studentName: this.student.studentName,
      phoneNo: this.student.phoneNo,
      address: this.student.address,
      email: this.student.email,
      userID: this.student.userID,
      classID: this.student.classID
    };

    if (this.editMode) {
      // Update without image (or add separate image update endpoint)
      this.studentService.update(this.editID, payload).subscribe({
        next: () => {
          // If image is selected, update it separately
          if (this.selectedImage) {
            this.studentService.updateProfileImage(this.editID, this.selectedImage).subscribe({
              next: () => {
                alert("Student and profile image updated successfully!");
                this.resetForm();
                this.loadStudents();
              },
              error: (err: any) => {
                console.error("Update image failed:", err);
                alert("Student updated but image update failed");
                this.loadStudents();
              }
            });
          } else {
            alert("Student updated successfully!");
            this.resetForm();
            this.loadStudents();
          }
        },
        error: (err: any) => {
          console.error("Update student failed:", err);
          alert("Error updating student");
        }
      });
    } else {
      // Add new student with image
      this.studentService.add(payload, this.selectedImage || undefined).subscribe({
        next: () => {
          alert("Student added successfully!");
          this.resetForm();
          this.loadStudents();
        },
        error: (err: any) => {
          console.error("Save student failed:", err);
          let errorMsg = "Unknown error";
          if (err.error && err.error.detail) {
            errorMsg = err.error.detail;
          } else if (err.error && err.error.message) {
            errorMsg = err.error.message;
          } else if (err.message) {
            errorMsg = err.message;
          }
          alert("Error saving student: " + errorMsg);
        }
      });
    }
  }

  editStudent(st: any) {
    this.editMode = true;
    this.editID = st.studentID;

    this.student = {
      studentName: st.studentName,
      phoneNo: st.phoneNo,
      address: st.address,
      email: st.email,
      userID: st.userID,
      classID: st.classID
    };

    // Load existing profile image if available
    this.imagePreview = st.profileURL || null;
    this.selectedImage = null;
  }

  deleteStudent(id: string) {
    if (confirm("Are you sure to delete this student?")) {
      this.studentService.delete(id).subscribe( {
        next: ()=>{
        alert("Deleted successfully!");
        this.loadStudents();
      }, error: (err:any) => {
        console.error("Delete failed", err);
        alert("Failed to delete student");
      }
      });
    }
  }

  resetForm() {
    this.student = {
      studentName: '',
      email: '',
      phoneNo: '',
      address: '',
      userID: '',
      classID: '',
      studentID: ''
    };
    this.editMode = false;
    this.editID = '';
    this.selectedImage = null;
    this.imagePreview = null;
  }

}
