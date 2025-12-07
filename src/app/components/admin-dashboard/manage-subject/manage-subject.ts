import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubjectService } from '../../../Service/subject-service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-manage-subject',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './manage-subject.html',
  styleUrl: './manage-subject.css',
})
export class ManageSubject implements OnInit {

  subjects: any[] = [];

  model: any = {
    subjectName: '',
    studentID: '',
    classID: '',
    userID: '',
    teacherID: ''
  };

  isEditing = false;
  currentEditId = '';

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects() {
    this.subjectService.getAll().subscribe({
      next: (res: any) => {
        this.subjects = res;
      },
      error: (err) => console.error("Failed to load subjects", err)
    });
  }

  onSubmit() {
    if (this.isEditing) {
      this.update();
    } else {
      this.add();
    }
  }

  add() {
    this.subjectService.add(this.model).subscribe({
      next: () => {
        alert("Subject added successfully!");
        this.loadSubjects();
        this.reset();
      },
      error: (err) => {
        console.error("Add failed", err);
        alert("Failed to add subject");
      }
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
      error: (err) => {
        console.error("Update failed", err);
        alert("Failed to update subject");
      }
    });
  }

  delete(id: string) {
    if (confirm("Are you sure to delete this subject?")) {
      this.subjectService.delete(id).subscribe({
        next: () => {
          alert("Deleted successfully!");
          this.loadSubjects();
        },
        error: (err) => {
          console.error("Delete failed", err);
          alert("Failed to delete subject");
        }
      });
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
