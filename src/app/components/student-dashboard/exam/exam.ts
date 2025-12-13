import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExamService } from '../../../Service/exam-service';
import { StudentService } from '../../../Service/student-service';

@Component({
  selector: 'app-student-exams',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exam.html',
  styleUrls: ['./exam.css']
})
export class Exam implements OnInit {
  exams: any[] = [];
  filteredExams: any[] = [];
  student: any = null;
  searchKey: string = '';
  loading = false;
  error = '';

  constructor(
    private examService: ExamService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const sid = localStorage.getItem('studentID');
    if (!sid) {
      this.error = 'Student not identified. Please login again.';
      return;
    }

    this.loading = true;
    // Load student to get classID
    this.studentService.getById(sid).subscribe({
      next: (s: any) => {
        this.student = s;
        this.loadExamsForClass(s.classID);
      },
      error: (err) => {
        console.error('Failed to load student', err);
        this.error = 'Failed to load student details.';
        this.loading = false;
      }
    });
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
  
  loadExamsForClass(classId: string) {
    this.examService.getAll().subscribe({
      next: (res: any) => {
        // safe fallback
        const all: any[] = res ?? [];

        // If backend already returns subject name/class details in exam, great.
        // Filter to the student's class
        this.exams = all.filter(x => (x.classID ?? x.classId ?? x.classIdString ?? '') === classId);

        // If backend uses Guid objects, you may need to stringify comparison:
        // this.exams = all.filter(x => (x.classID || '').toString() === classId.toString());

        this.applySearch();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load exams', err);
        this.error = 'Failed to load exams from server.';
        this.loading = false;
      }
    });
  }

  applySearch() {
    const q = this.searchKey.trim().toLowerCase();
    if (!q) {
      this.filteredExams = this.exams.slice();
      return;
    }
    this.filteredExams = this.exams.filter(e =>
      (e.examName || '').toLowerCase().includes(q) ||
      ((e.subjectName || e.subject?.subjectName || '') + '').toLowerCase().includes(q) ||
      ((e.examDate || '') + '').toLowerCase().includes(q)
    );
  }

  // Helper to format date safely
  formatDate(d: any) {
    if (!d) return 'N/A';
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return d; // if already string, return
    return dt.toLocaleDateString();
  }
}
