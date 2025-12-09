import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Service/student-service';
import { FormsModule } from '@angular/forms';
import { inject } from '@angular/core/primitives/di';
import {  HttpClientModule } from '@angular/common/http';
import { About } from "../../home/about/about";

@Component({
  selector: 'app-manage-students',
  imports: [CommonModule, FormsModule, About],
  templateUrl: './manage-students.html',
  styleUrl: './manage-students.css',
  standalone:true
  
  
})
export class ManageStudents implements OnInit {
searchStudents($event: Event) {
throw new Error('Method not implemented.');
}
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

    const request$ = this.editMode
      ? this.studentService.update(this.editID, payload)
      : this.studentService.add(payload);

    request$.subscribe({
      next: () => {
        alert(this.editMode ? "Student updated successfully!" : "Student added successfully!");
        this.resetForm();
        this.loadStudents(); // refresh table
      },
      error: (err: any) => {
        console.error("Save student failed:", err);
        let errorMsg = "Unknown error";
        if (err.error && err.error.detail) {
          errorMsg = err.error.detail;
        } else if (err.message) {
          errorMsg = err.message;
        }
        alert("Error saving student: " + errorMsg);
      }
    });
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
  }

}
