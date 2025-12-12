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

    const request$ = this.editMode
      ? this.studentService.update(this.editID, payload)
      : this.studentService.add(payload);

    request$.subscribe({
      next: () => {
        alert(this.editMode ? "Student updated!" : "Student added!");
        this.resetForm();
        this.loadStudents();
      },
      error: err => console.log(err)
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
      userID: s.userID
    };
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
  }
}
