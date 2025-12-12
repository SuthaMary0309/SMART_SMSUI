import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../Service/exam-service';
import { ClassService } from '../../../Service/class-service';
import { SubjectService } from '../../../Service/subject-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-exam',
  templateUrl: './manage-exam.html',
  styleUrls: ['./manage-exam.css'],
  imports:[FormsModule,CommonModule]
})
export class ManageExam implements OnInit {

  exams: any[] = [];     // initialize as empty array
  classes: any[] = [];   // initialize as empty array
  subjects: any[] = [];  // initialize as empty array

  exam = {
    examID: '',
    examName: '',
    examDate: '',
    classID: '',
    subjectID: ''
  };

  editMode = false;
  editId = '';

  constructor(
    private examService: ExamService,
    private classService: ClassService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.loadExams();
    this.loadClasses();
    this.loadSubjects();
  }
  getClassName(classID: string): string {
    const cls = this.classes.find(c => c.classID === classID);
    return cls ? `${cls.className} (Grade ${cls.grade})` : 'N/A';
  }
  
  getSubjectName(subjectID: string): string {
    const sub = this.subjects.find(s => s.subjectID === subjectID);
    return sub ? sub.subjectName : 'N/A';
  }
  
  loadExams() {
    this.examService.getAll().subscribe({
      next: (res: any) => this.exams = res || [],
      error: err => console.error("Exam load error", err)
    });
  }

  loadClasses() {
    this.classService.getAll().subscribe({
      next: (res: any) => this.classes = res || [],
      error: err => console.error("Class load error", err)
    });
  }

  loadSubjects() {
    this.subjectService.getAll().subscribe({
      next: (res: any) => this.subjects = res || [],
      error: err => console.error("Subject load error", err)
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
      },
      error: err => console.error("Save exam error", err)
    });
  }

  editExam(e: any) {
    this.editMode = true;
    this.editId = e.examID;

    this.exam = {
      examID: e.examID,
      examName: e.examName,
      examDate: e.examDate.split('T')[0],
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
        },
        error: err => console.error("Delete exam error", err)
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
