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
  marks : any ={
    marksId :'',
    mark: 0,
    studentID: '',
    examID:  '',
  }
  

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
      m.studentID === this.marks.studentID &&
      m.examID === this.marks.examID &&
      (!this.isEditMode || m.marksId !== this.marks.marksId)
    );
  }

  validateForm(): boolean {
  
    if (!this.marks.mark || this.marks.mark < 0 || this.marks.mark >= 100) {
      alert("⚠ Mark must be between 0-100");
      return false;
    }
    if (!this.marks.studentID) {
      alert("⚠ Please select a student");
      return false;
    }
    if (!this.marks.examID) {
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
    const payload = {
      ...this.marks,
      classID: String(this.marks.studentID),
      userID: String(this.marks.examID)
    };
  
      console.log("Selected Student ID:", this.marks.studentID);
      console.log("Selected exam ID:", this.marks.examID);
      console.log("Payload being sent:", payload);


    this.marksService.addMarks(this.marks.grade, this.marks.mark, this.marks.studentID, this.marks.examID)
      .subscribe(() => {
        alert("Marks Added Successfully!");
        this.resetForm();
        this.getAllMarks();
      });
  }
  onStudentChange(event: any) {
    console.log("Selected Student ID:", this.marks.studentID);
  }
  onExamChange(event: any) {
    console.log("Selected Exam ID:", this.marks.examID);
  }
  

  editMarks(m: any) {
    this.isEditMode = true;
    this.marks.marksId = m.marksId;
    this.marks.mark = m.mark;
    this.marks.studentID = m.studentID;
    this.marks.examID = m.examID;
  }

  updateMarks() {
    if (!this.validateForm()) return;

    if (this.isDuplicate()) {
      alert("⚠ Duplicate! Marks for this student & exam already exist.");
      return;
    }

    this.marksService.updateMarks(this.marks.marksId,this.marks.grade ,this.marks.mark, this.marks.studentID, this.marks.examID)
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
    this.marks.mark = 0;
    this.marks.studentID = '';
    this.marks.examID = '';
    this.marks.marksId = '';
    this.isEditMode = false;
  }
}
