import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExamService } from '../../../Service/exam-service';

@Component({
  selector: 'app-manage-exam',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './manage-exam.html',
  styleUrls: ['./manage-exam.css']
})
export class ManageExam implements OnInit {

  exams: any[] = [];

  exam = {
    examID: '',
    examName: '',
    examDate: '',
    classID: '',
    subjectID: ''
  };

  editMode = false;
  editId = '';

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.loadExams();
  }

  loadExams() {
    this.examService.getAll().subscribe({
      next: (res: any) => this.exams = res,
      error: err => console.error("Exam load error", err)
    });
  }

  saveExam() {
    const req = this.editMode
      ? this.examService.update(this.editId, this.exam)
      : this.examService.add(this.exam);

    req.subscribe({
      next: () => {
        alert(this.editMode ? "Exam Updated!" : "Exam Added!");
        this.resetForm();
        this.loadExams();
      }
    });
  }

  editExam(e: any) {
    this.editMode = true;
    this.editId = e.examID;

    this.exam = {
      examID: e.examID,
      examName: e.examName,
      examDate: e.examDate.split("T")[0], 
      classID: e.classID,
      subjectID: e.subjectID
    };
  }

  deleteExam(id: string) {
    if (confirm("Delete this exam?")) {
      this.examService.delete(id).subscribe({
        next: () => {
          alert("Exam Deleted!");
          this.loadExams();
        }
      });
    }
  }

  resetForm() {
    this.editMode = false;
    this.editId = '';
    this.exam = {
      examID: '',
      examName: '',
      examDate: '',
      classID: '',
      subjectID: ''
    };
  }
}
