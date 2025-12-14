import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../Service/student-service';
import { TeacherService } from '../../Service/teacher-service';
import { ExamService } from '../../Service/exam-service';
import { AttendanceService } from '../../Service/attendance-service';
import { ParentService } from '../../Service/parent-service';
import { ClassService } from '../../Service/class-service';
import { SubjectService } from '../../Service/subject-service';
import { MarksService } from '../../Service/marks-service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit, AfterViewInit {
  @ViewChild('barChart') barChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doughnutChart') doughnutChartRef!: ElementRef<HTMLCanvasElement>;

  name = '';
  students: any[] = [];
  teachers: any[] = [];
  exams: any[] = [];
  attendanceList: any[] = [];
  parents: any[] = [];
  classes: any[] = [];
  subjects: any[] = [];
  marks: any[] = [];

  barChart: Chart | null = null;
  doughnutChart: Chart | null = null;

  presentCount = 0;
  absentCount = 0;
  todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private examService: ExamService,
    private attendanceService: AttendanceService,
    private parentService: ParentService,
    private classService: ClassService,
    private subjectService: SubjectService,
    private marksService: MarksService
  ) {}

  ngOnInit() {
    this.name =
      localStorage.getItem('name') ||
      localStorage.getItem('username') ||
      'Admin';
    this.loadAllData();
  }

  ngAfterViewInit() {
    setTimeout(() => this.updateCharts(), 500);
  }


  loadAllData() {
    this.loadStudents();
    this.loadTeachers();
    this.loadExams();
    this.loadAttendance();
    this.loadParents();
    this.loadClasses();
    this.loadSubjects();
    this.loadMarks();
  }

  loadClasses() {
    this.classService.getAll().subscribe({
      next: (res: any) => { this.classes = res || []; },
      error: (err) => console.error('Failed to load classes', err),
    });
  }

  loadSubjects() {
    this.subjectService.getAll().subscribe({
      next: (res: any) => { this.subjects = res || []; },
      error: (err) => console.error('Failed to load subjects', err),
    });
  }

  loadMarks() {
    this.marksService.getAllMarks().subscribe({
      next: (res: any) => { this.marks = res || []; },
      error: (err) => console.error('Failed to load marks', err),
    });
  }

  loadStudents() {
    this.studentService.getAll().subscribe({
      next: (res: any) => {
        this.students = res || [];
        this.updateCharts();
      },
      error: (err) => console.error('Failed to load students', err),
    });
  }

  loadTeachers() {
    this.teacherService.getAll().subscribe({
      next: (res: any) => {
        this.teachers = res || [];
        this.updateCharts();
      },
      error: (err) => console.error('Failed to load teachers', err),
    });
  }

  loadExams() {
    this.examService.getAll().subscribe({
      next: (res: any) => {
        this.exams = res || [];
        this.updateCharts();
      },
      error: (err) => console.error('Failed to load exams', err),
    });
  }

  loadAttendance() {
    this.attendanceService.getAll().subscribe({
      next: (res: any) => {
        this.attendanceList = res || [];
        this.calculateAttendanceStats();
        this.updateCharts();
      },
      error: (err) => console.error('Failed to load attendance', err),
    });
  }

  loadParents() {
    this.parentService.getAll().subscribe({
      next: (res: any) => {
        this.parents = res || [];
        this.updateCharts();
      },
      error: (err) => console.error('Failed to load parents', err),
    });
  }

  calculateAttendanceStats() {
    this.presentCount = this.attendanceList.filter(
      (a) => a.status?.toLowerCase() === 'present'
    ).length;
    this.absentCount = this.attendanceList.filter(
      (a) => a.status?.toLowerCase() === 'absent'
    ).length;
  }

  updateCharts() {
    this.createBarChart();
    this.createDoughnutChart();
  }

  createBarChart() {
    if (!this.barChartRef?.nativeElement) return;

    if (this.barChart) {
      this.barChart.destroy();
    }

    const ctx = this.barChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Students', 'Teachers', 'Parents', 'Exams'],
        datasets: [
          {
            label: 'Total Count',
            data: [
              this.students.length,
              this.teachers.length,
              this.parents.length,
              this.exams.length,
            ],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(139, 92, 246, 0.8)',
            ],
            borderColor: [
              'rgb(59, 130, 246)',
              'rgb(16, 185, 129)',
              'rgb(245, 158, 11)',
              'rgb(139, 92, 246)',
            ],
            borderWidth: 2,
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'School Overview Statistics',
            color: '#fff',
            font: { size: 16, weight: 'bold' },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(255,255,255,0.1)' },
            ticks: { color: '#fff' },
          },
          x: {
            grid: { display: false },
            ticks: { color: '#fff' },
          },
        },
      },
    });
  }


  createDoughnutChart() {
    if (!this.doughnutChartRef?.nativeElement) return;

    if (this.doughnutChart) {
      this.doughnutChart.destroy();
    }

    const ctx = this.doughnutChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.doughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Present', 'Absent'],
        datasets: [
          {
            data: [this.presentCount || 1, this.absentCount || 0],
            backgroundColor: [
              'rgba(16, 185, 129, 0.9)',
              'rgba(239, 68, 68, 0.9)',
            ],
            borderColor: ['#10b981', '#ef4444'],
            borderWidth: 2,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#fff', padding: 15 },
          },
          title: {
            display: true,
            text: 'Attendance Overview',
            color: '#fff',
            font: { size: 16, weight: 'bold' },
          },
        },
      },
    });
  }

  getRecentExams() {
    return this.exams.slice(0, 5);
  }

  getRecentStudents() {
    return this.students.slice(0, 5);
  }
}
