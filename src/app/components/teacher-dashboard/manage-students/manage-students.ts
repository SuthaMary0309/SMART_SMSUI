import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StudentService } from '../../../Service/student-service';

@Component({
  selector: 'app-manage-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl :'./manage-students.html',
  styleUrl: './manage-students.css',
  
})
export class ManageStudents implements OnInit {
searchStudents($event: Event) {
throw new Error('Method not implemented.');
}

  constructor(private studentService: StudentService) {}

  students: any[] = [];

  student: any = {
    studentName: '',
    phoneNo: '',
    address: '',
    email: '',
    classID: '',
  };

  editMode: boolean = false;
  editID: string = '';

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAll().subscribe({
      next: (res: any) => {
        this.students = res;
      },
      error: (err: any) => {
        console.error("Failed to load students", err);
      }
    });
  }

  saveStudent() {

    // ----------- FRONT-END VALIDATIONS ----------------
    if (!this.student.studentName || !this.student.email || !this.student.classID) {
      alert("Please fill all required fields");
      return;
    }

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.student.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // convert classID to Guid (backend expects GUID)
    let payload = {
      studentName: this.student.studentName,
      phoneNo: this.student.phoneNo,
      address: this.student.address,
      email: this.student.email,
      classID: this.student.classID,   // FIXED: send as GUID STRING
    };

    const request$ = this.editMode
      ? this.studentService.update(this.editID, payload)
      : this.studentService.add(payload);

    request$.subscribe({
      next: () => {
        alert(this.editMode ? "Student updated successfully!" : "Student added successfully!");
        this.resetForm();
        this.loadStudents();
      },
      error: (err: any) => {
        console.error("Save student failed:", err);

        if (err.error?.errors?.Email) {
          alert(err.error.errors.Email[0]);
          return;
        }

        alert("Error saving student");
      }
    });
  }

  editStudent(s: any) {
    this.editMode = true;
    this.editID = s.studentID;

    this.student = {
      studentName: s.studentName,
      phoneNo: s.phoneNo,
      address: s.address,
      email: s.email,
      classID: s.classID,
    };
  }

  deleteStudent(id: string) {
    if (confirm("Are you sure to delete this student?")) {
      this.studentService.delete(id).subscribe({
        next: () => {
          alert("Student deleted!");
          this.loadStudents();
        },
        error: (err: any) => {
          console.error("Delete failed", err);
          alert("Failed to delete student");
        }
      });
    }
  }

  resetForm() {
    this.student = {
      studentName: '',
      phoneNo: '',
      address: '',
      email: '',
      classID: '',
    };

    this.editMode = false;
    this.editID = '';
  }
}
