import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SubjectService } from '../../../Service/subject-service';
import { StudentService } from '../../../Service/student-service';
import { TeacherService } from '../../../Service/teacher-service';
import { ClassService } from '../../../Service/class-service';
import { UserService } from '../../../Service/user-service';

@Component({
  selector: 'app-manage-subject',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './manage-subject.html',
  styleUrl: './manage-subject.css',
})
export class ManageSubject implements OnInit {

  subjects: any[] = [];

  students: any[] = [];
  teachers: any[] = [];
  classes: any[] = [];
  users: any[] = [];

  model: any = {
    subjectName: '',
    studentID: '',
    classID: '',
    userID: '',
    teacherID: ''
  };

  isEditing = false;
  currentEditId = '';

  constructor(
    private subjectService: SubjectService,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private classService: ClassService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadSubjects();
    this.loadStudents();
    this.loadTeachers();
    this.loadClasses();
    this.loadUsers();
  }

  loadSubjects() {
    this.subjectService.getAll().subscribe(res => this.subjects = res as any[]);
  }
  getClassName(classID: string): string {
    const cls = this.classes.find(c => c.classID === classID);
    return cls ? `${cls.className} (Grade ${cls.grade})` : 'N/A';
  }
  getTeacherName(teacherID: string): string {
    const teachers = this.teachers.find(t => t.teacherID === teacherID);
    return teachers ? `${teachers.teacherName} ` : 'N/A';
  }
  loadStudents() {
    this.studentService.getAll().subscribe(res => this.students = res as any[]);
  }

  loadTeachers() {
    this.teacherService.getAll().subscribe(res => this.teachers = res as any[]);
  }

  loadClasses() {
    this.classService.getAll().subscribe((res: any) => {
      this.classes = res;
      console.log("Classes loaded:", this.classes);
    });
  }
  onClassChange(event: any) {
    console.log("Selected Class ID:", this.model.classID);
  }
  onTeacherChange(event: any) {
    console.log("Selected Teacher ID:", this.model.teacherID);
  }
  onUserChange(event: any) {
    console.log("Selected User ID:", this.model.userID);
  }
  onStudentChange(event: any) {
    console.log("Selected Student ID:", this.model.studentID);
  }
  

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        const assignedUserIDs = this.students.map(s => s.userID);
        this.users = res.filter((u: any) => 
          u.role.toLowerCase() === 'student' && !assignedUserIDs.includes(u.userID)
        );
        console.log("Available Users:", this.users);
      },
      error: (err) => console.error('Failed to load users', err)
    });
  }

  // 🔍 DUPLICATE CHECK
  isDuplicate(): boolean {
    return this.subjects.some(s =>
      s.subjectName.toLowerCase() === this.model.subjectName.toLowerCase() &&
      s.classID === this.model.classID &&
      s.teacherID === this.model.teacherID &&
      (!this.isEditing || s.subjectID !== this.currentEditId)
    );
  }

  onSubmit() {
    if (!this.model.subjectName || !this.model.classID ||
        !this.model.teacherID || !this.model.userID || !this.model.studentID) {
      alert("⚠️ All fields are required!");
      return;
    }
    const payload = {
      ...this.model,
      classID: String(this.model.classID),
      userID: String(this.model.userID),
      teacherID: String(this.model.teacherID)
    };
  
      console.log("Selected Class ID:", this.model.classID);
      console.log("Selected Teacher ID:", this.model.teacherID);
      console.log("Selected User ID:", this.model.userID);
      console.log("Payload being sent:", payload);


    if (this.isDuplicate()) {
      alert("⚠️ Duplicate entry! Same subject already exists for this class & teacher.");
      return;
    }

    if (this.isEditing) this.update();
    else this.add();
  }

  add() {
    this.subjectService.add(this.model).subscribe({
      next: () => {
        alert("Subject added successfully!");
        this.loadSubjects();
        this.reset();
      },
      error: () => alert("Add failed")
    });
  }

  edit(s: any) {
    this.isEditing = true;
    this.currentEditId = s.subjectID;

    this.model = {
      subjectName: s.subjectName,
      studentID: s.studentID,
      classID: s.classID,
      userID: s.userID,
      teacherID: s.teacherID
    };
  }

  update() {
    this.subjectService.update(this.currentEditId, this.model).subscribe({
      next: () => {
        alert("Subject updated successfully!");
        this.loadSubjects();
        this.reset();
      },
      error: () => alert("Failed to update")
    });
  }

  delete(id: string) {
    if (confirm("Delete subject?")) {
      this.subjectService.delete(id).subscribe(() => this.loadSubjects());
    }
  }

  reset() {
    this.model = {
      subjectName: '',
      studentID: '',
      classID: '',
      userID: '',
      teacherID: ''
    };
    this.isEditing = false;
    this.currentEditId = '';
  }
}
