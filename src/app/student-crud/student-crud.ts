import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../Service/student-service';

@Component({
  selector: 'app-student-crud',
  templateUrl: './student-crud.html',
  styleUrls: ['./student-crud.css'],
  imports: [FormsModule, CommonModule]
})
export class StudentCrud implements OnInit {

  private studentService = inject(StudentService);

  students: any[] = [];
  student: any = {
    studentName: '',
    phoneNo: 0,
    address: '',
    email: '',
    userID: '',
    classID: ''
  };

  editMode: boolean = false;
  editID: string = '';

  ngOnInit(): void {
  //   this.loadStudents();
  }

  // loadStudents() {
  //   this.studentService.getAll().subscribe((res: any) => {
  //     this.students = res;
  //   });
  // }

  saveStudent() {
    if (this.editMode) {
      this.studentService.update(this.editID, this.student).subscribe(() => {
        alert("Student updated successfully!");
        this.resetForm();
        //this.loadStudents();
      });
    } else {
      this.studentService.add(this.student).subscribe(() => {
        alert("Student added successfully!");
        this.resetForm();
        //this.loadStudents();
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
  }

  deleteStudent(id: string) {
    if (confirm("Are you sure to delete this student?")) {
      this.studentService.delete(id).subscribe(() => {
        alert("Deleted successfully!");
       // this.loadStudents();
      });
    }
  }

  resetForm() {
    this.editMode = false;
    this.editID = "";
    this.student = {
      studentName: '',
      phoneNo: '',
      address: '',
      email: '',
      userID: '',
      classID: ''
    };
  }
}
