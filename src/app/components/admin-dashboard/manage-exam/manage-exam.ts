import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ExamService, ExamDTO } from '../../../Service/exam-service';

@Component({
  selector: 'app-manage-exam',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './manage-exam.html',
  styleUrls: ['./manage-exam.css']
})
export class ManageExam implements OnInit {

  exams: ExamDTO[] = [];

  examData: ExamDTO = {
    classID: '',
    subjectID: '',
    examName: '',
    examDate: ''
  };

  editMode = false;
  editID: string = '';

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.loadExams();
  }

  loadExams() {
    this.examService.getAll().subscribe({
      next: (res: any) => this.exams = res as ExamDTO[],  // cast to ExamDTO[]
      error: (err) => console.error("Load exams failed", err)
    });
  }
  

  save() {
    if (!this.examData.examName || !this.examData.classID || !this.examData.subjectID || !this.examData.examDate) {
      alert("Please fill all required fields");
      return;
    }

    if (this.editMode) {
      this.updateExam();
    } else {
      this.addExam();
    }
  }

  addExam() {
    this.examService.add(this.examData).subscribe({
      next: () => {
        alert("Exam added successfully!");
        this.loadExams();
        this.resetForm();
      },
      error: err => console.error("Add exam failed", err)
    });
  }

  edit(exam: ExamDTO) {
    this.editMode = true;
    this.editID = exam.examID!;
    this.examData = { ...exam };
  }

  updateExam() {
    this.examService.update(this.editID, this.examData).subscribe({
      next: () => {
        alert("Exam updated successfully!");
        this.loadExams();
        this.resetForm();
      },
      error: err => console.error("Update exam failed", err)
    });
  }

  delete(id?: string) {
    if (!id) return;
    if (confirm("Are you sure to delete this exam?")) {
      this.examService.delete(id).subscribe({
        next: () => this.loadExams(),
        error: err => console.error("Delete exam failed", err)
      });
    }
  }

  resetForm() {
    this.examData = {
      classID: '',
      subjectID: '',
      examName: '',
      examDate: ''
    };
    this.editMode = false;
    this.editID = '';
  }
}
