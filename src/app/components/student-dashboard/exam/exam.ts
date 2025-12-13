import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ExamService } from '../../../Service/exam-service';
import { StudentService } from '../../../Service/student-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-exams',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exam.html',
  styleUrls: ['./exam.css']
})
export class Exam implements OnInit {

  @Input() studentId!: string;

  exams: any[] = [];
  filteredExams: any[] = [];
  searchKey = '';
  loading = false;
  error = '';

  constructor(
    private examService: ExamService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    if (!this.studentId) {
      this.error = 'Student not identified.';
      return;
    }

    this.loading = true;

    this.studentService.getById(this.studentId).subscribe({
      next: (student: any) => {
        const classId = student.classID;
        this.loadExamsForClass(classId);
      },
      error: () => {
        this.error = 'Failed to load student.';
        this.loading = false;
      }
    });
  }

  loadExamsForClass(classId: string) {
    this.examService.getByClassId(classId).subscribe({
      next: (res: any[]) => {
        this.exams = res ?? [];
        this.applySearch();
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load exams.';
        this.loading = false;
      }
    });
  }

  applySearch() {
    const q = this.searchKey.trim().toLowerCase();
    this.filteredExams = !q
      ? [...this.exams]
      : this.exams.filter(e =>
          (e.examName || '').toLowerCase().includes(q) ||
          ((e.subjectName || '') + '').toLowerCase().includes(q)
        );
  }

  formatDate(d: any) {
    const dt = new Date(d);
    return isNaN(dt.getTime()) ? d : dt.toLocaleDateString();
  }

  formatExamTime(e: any): string {
    if (e.examTime) return e.examTime;
    if (e.time) return e.time;
    if (e.examDate) {
      const d = new Date(e.examDate);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return '-';
  }
}
