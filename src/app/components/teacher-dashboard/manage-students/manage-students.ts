import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Service/student-service';
import { ClassService } from '../../../Service/class-service';
import { UserService } from '../../../Service/user-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-students',
  standalone: true,
  imports: [FormsModule,CommonModule],
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './manage-students.html',
  styleUrl: './manage-students.css',
})
export class ManageStudents implements OnInit {

  students: any[] = [];
  classes: any[] = [];
  users: any[] = [];

  searchKey: string = "";

  student: any = {
    studentName: '',
    phoneNo: '',
    address: '',
    email: '',
    classID: '',
    userID: ''
  };

  editMode = false;
  editID = '';
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private studentService: StudentService,
    private classService: ClassService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadClasses();
    this.loadUsers();
  }

  loadStudents() {
    this.studentService.getAll().subscribe({
      next: (res: any) => this.students = res,
      error: (err) => {
        console.error('Failed to load students', err);
        alert('Failed to load students');
      }
    });
  }

  loadClasses() {
    this.classService.getAll().subscribe((res: any) => {
      this.classes = res;
    });
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res: any) => this.users = res,
      error: (err) => {
        console.error('Failed to load users', err);
        alert('Failed to load users');
      }
    });
  }

  searchStudents(event: any) {
    const key = event.target.value.toLowerCase();
    this.searchKey = key;

    this.studentService.getAll().subscribe((res: any) => {
      this.students = res.filter((s: any) =>
        s.studentName.toLowerCase().includes(key) ||
        s.email.toLowerCase().includes(key) ||
        s.phoneNo.toLowerCase().includes(key)
      );
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

    // 🔥 FULL VALIDATION
    if (!this.student.studentName || !this.student.email || !this.student.classID || !this.student.userID) {
      alert("Please fill all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.student.email)) {
      alert("Invalid email format");
      return;
    }

    if (this.student.phoneNo.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }

    // 🔥 DUPLICATE CHECK
    const duplicate = this.students.find(s =>
      (s.email === this.student.email || s.phoneNo === this.student.phoneNo) &&
      s.studentID !== this.editID
    );

    if (duplicate) {
      alert("Email or phone number already exists!");
      return;
    }

    const payload = { ...this.student };

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

  editStudent(s: any) {
    this.editMode = true;
    this.editID = s.studentID;

    this.student = {
      studentName: s.studentName,
      phoneNo: s.phoneNo,
      address: s.address,
      email: s.email,
      classID: s.classID||'3fa85f64-5717-4562-b3fc-2c963f66afa6',
      userID: s.userID
    };

    // Load existing profile image if available
    this.imagePreview = s.profileURL || null;
    this.selectedImage = null;
  }

  deleteStudent(id: string) {
    if (!confirm("Delete student?")) return;
    this.studentService.delete(id).subscribe(() => this.loadStudents());
  }

  resetForm() {
    this.student = {
      studentName: '',
      phoneNo: '',
      address: '',
      email: '',
      classID: '',
      userID: ''
    };
    this.editMode = false;
    this.editID = '';
    this.selectedImage = null;
    this.imagePreview = null;
  }
}
