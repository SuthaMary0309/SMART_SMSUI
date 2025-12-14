import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StudentService } from '../../../Service/student-service';
import { TeacherService } from '../../../Service/teacher-service';
import { ExamService } from '../../../Service/exam-service';
import { AttendanceService } from '../../../Service/attendance-service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  students: any[] = [];
  teachers: any[] =[];
  exams:any[] =[];
  attendanceList: any[] = [];

  constructor(
    private studentService: StudentService,
    private teacherService:TeacherService,
    private examService:ExamService,
    private attendanceService: AttendanceService
    
  ) {}

  ngOnInit() {
    this.loadStudents()
    this.loadExams()
    this.loadTeachers()
    this.loadAttendance()

  }

    @ViewChild('aboutSection') aboutSection!: ElementRef;

  scrollToAbout() {
    if(this.aboutSection) {
      this.aboutSection.nativeElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
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
  loadAttendance() {
    this.attendanceService.getAll().subscribe((res: any) => {
      this.attendanceList = (res || []).map((r: any) => ({
        ...r,
        displayDate: r.date ? (new Date(r.date)).toLocaleDateString() : '',
      }));
    });
  }

  loadTeachers() {
    this.teacherService.getAll().subscribe({
      next: (res: any) => this.teachers = res,
      error: (err) => {
        console.error('Failed to load teachers', err);
        alert('Failed to load teachers');
      }
      
    });

  }

  loadExams() {
    this.examService.getAll().subscribe({
      next: (res: any) => this.exams = res,
      error: (err) => {
        console.error('Failed to load exams', err);
        alert('Failed to load exams');
      }
      
    });
  }

}
