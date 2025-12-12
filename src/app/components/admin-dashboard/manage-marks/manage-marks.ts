import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MarksService } from '../../../Service/marks-service';
import { StudentService } from '../../../Service/student-service';
import { ExamService } from '../../../Service/exam-service';

@Component({
  selector: 'app-manage-marks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-marks.html',
  styleUrls: ['./manage-marks.css']
})
export class ManageMarks implements OnInit {

  marksList: any[] = [];

  students: any[] = [];
  exams: any[] = [];

  // Form fields
  marksId = '';
  grade: number = 0;
  mark: number = 0;
  studentID: string = '';
  examID: string = '';

  isEditMode = false;

  constructor(
    private marksService: MarksService,
    private studentService: StudentService,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.getAllMarks();
    this.loadStudents();
    this.loadExams();
  }

  loadStudents() {
    this.studentService.getAll().subscribe(res => {
      this.students = res as any[];
    });
  }

  loadExams() {
    this.examService.getAll().subscribe(res => {
      this.exams = res as any[];
    });
  }

  getAllMarks() {
    this.marksService.getAllMarks().subscribe(res => {
      this.marksList = res;
    });
  }

  // 🔍 DUPLICATE CHECK
  isDuplicate(): boolean {
    return this.marksList.some(m =>
      m.studentID === this.studentID &&
      m.examID === this.examID &&
      (!this.isEditMode || m.marksId !== this.marksId)
    );
  }

  validateForm(): boolean {
    if (!this.grade || this.grade <= 0) {
      alert("⚠ Grade is required!");
      return false;
    }
    if (!this.mark || this.mark < 0 || this.mark > 100) {
      alert("⚠ Mark must be between 0-100");
      return false;
    }
    if (!this.studentID) {
      alert("⚠ Please select a student");
      return false;
    }
    if (!this.examID) {
      alert("⚠ Please select an exam");
      return false;
    }
    return true;
  }

  addMarks() {
    if (!this.validateForm()) return;

    if (this.isDuplicate()) {
      alert("⚠ Duplicate! Marks for this student & exam already exist.");
      return;
    }

    this.marksService.addMarks(this.grade, this.mark, this.studentID, this.examID)
      .subscribe(() => {
        alert("Marks Added Successfully!");
        this.resetForm();
        this.getAllMarks();
      });
  }

  editMarks(m: any) {
    this.isEditMode = true;
    this.marksId = m.marksId;
    this.grade = m.grade;
    this.mark = m.mark;
    this.studentID = m.studentID;
    this.examID = m.examID;
  }

  updateMarks() {
    if (!this.validateForm()) return;

    if (this.isDuplicate()) {
      alert("⚠ Duplicate! Marks for this student & exam already exist.");
      return;
    }

    this.marksService.updateMarks(this.marksId, this.grade, this.mark, this.studentID, this.examID)
      .subscribe(() => {
        alert("Marks Updated Successfully!");
        this.resetForm();
        this.getAllMarks();
        this.isEditMode = false;
      });
  }

  deleteMarks(id: string) {
    if (!confirm("Are you sure to delete?")) return;

    this.marksService.deleteMarks(id).subscribe(() => {
      alert("Deleted Successfully!");
      this.getAllMarks();
    });
  }

  resetForm() {
    this.grade = 0;
    this.mark = 0;
    this.studentID = '';
    this.examID = '';
    this.marksId = '';
    this.isEditMode = false;
  }
}
