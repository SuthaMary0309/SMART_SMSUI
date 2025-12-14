import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../Service/student-service';
import { AttendanceService } from '../../Service/attendance-service';
import { ExamService } from '../../Service/exam-service';
import { MarksService } from '../../Service/marks-service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css']
})
export class StudentDashboard implements OnInit, AfterViewInit {
  @ViewChild('attendanceChart') attendanceChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('marksChart') marksChartRef!: ElementRef<HTMLCanvasElement>;

  // Student Data
  student: any = null;
  userName: string = '';
  studentID: string = '';
  
  // Dashboard Data
  attendanceList: any[] = [];
  examsList: any[] = [];
  marksList: any[] = [];
  
  // Stats
  attendancePercentage: number = 0;
  presentCount: number = 0;
  absentCount: number = 0;
  totalExams: number = 0;
  averageMarks: number = 0;
  
  // UI State
  activeView: string = 'dashboard';
  showLogoutPopup: boolean = false;
  isLoading: boolean = true;
  
  // Charts
  attendanceChart: Chart | null = null;
  marksChart: Chart | null = null;
  
  // Date
  todayDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  constructor(
    private router: Router,
    private studentService: StudentService,
    private attendanceService: AttendanceService,
    private examService: ExamService,
    private marksService: MarksService
  ) {}


  ngOnInit(): void {
    this.userName = localStorage.getItem('name') || localStorage.getItem('username') || 'Student';
    this.studentID = localStorage.getItem('studentID') || '';
    
    if (this.studentID && this.studentID !== 'null' && this.studentID !== 'undefined') {
      this.loadStudentData();
    } else {
      this.isLoading = false;
      console.warn('No studentID found. Please login again.');
    }
  }

  ngAfterViewInit(): void {
    // Charts initialized after data loads
  }

  loadStudentData(): void {
    this.isLoading = true;
    
    // Load student details
    this.studentService.getById(this.studentID).subscribe({
      next: (res: any) => {
        this.student = res;
        this.userName = res.studentName || this.userName;
        this.loadAttendance();
        this.loadExams();
        this.loadMarks();
      },
      error: (err) => {
        console.error('Failed to load student details', err);
        this.isLoading = false;
      }
    });
  }

  loadAttendance(): void {
    this.attendanceService.getAll().subscribe({
      next: (res: any) => {
        // Filter attendance for this student
        this.attendanceList = (res || []).filter((a: any) => 
          a.studentId === this.studentID || a.studentID === this.studentID
        );
        this.calculateAttendanceStats();
        this.updateCharts();
      },
      error: (err) => console.error('Failed to load attendance', err)
    });
  }

  loadExams(): void {
    this.examService.getAll().subscribe({
      next: (res: any) => {
        // Filter exams for student's class
        if (this.student?.classID) {
          this.examsList = (res || []).filter((e: any) => 
            e.classID === this.student.classID || e.classId === this.student.classID
          );
        } else {
          this.examsList = res || [];
        }
        this.totalExams = this.examsList.length;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load exams', err);
        this.isLoading = false;
      }
    });
  }

  loadMarks(): void {
    this.marksService.getAllMarks().subscribe({
      next: (res: any) => {
        // Filter marks for this student
        this.marksList = (res || []).filter((m: any) => 
          m.studentID === this.studentID || m.studentId === this.studentID
        );
        this.calculateMarksStats();
        this.updateCharts();
      },
      error: (err) => console.error('Failed to load marks', err)
    });
  }

  calculateAttendanceStats(): void {
    this.presentCount = this.attendanceList.filter(a => 
      a.status?.toLowerCase() === 'present'
    ).length;
    this.absentCount = this.attendanceList.filter(a => 
      a.status?.toLowerCase() === 'absent'
    ).length;
    
    const total = this.presentCount + this.absentCount;
    this.attendancePercentage = total > 0 
      ? Math.round((this.presentCount / total) * 100) 
      : 0;
  }

  calculateMarksStats(): void {
    if (this.marksList.length > 0) {
      const totalMarks = this.marksList.reduce((sum, m) => sum + (m.mark || 0), 0);
      this.averageMarks = Math.round(totalMarks / this.marksList.length);
    }
  }


  updateCharts(): void {
    setTimeout(() => {
      this.createAttendanceChart();
      this.createMarksChart();
    }, 100);
  }

  createAttendanceChart(): void {
    if (!this.attendanceChartRef?.nativeElement) return;
    
    if (this.attendanceChart) {
      this.attendanceChart.destroy();
    }

    const ctx = this.attendanceChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.attendanceChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Present', 'Absent'],
        datasets: [{
          data: [this.presentCount || 1, this.absentCount || 0],
          backgroundColor: ['rgba(16, 185, 129, 0.9)', 'rgba(239, 68, 68, 0.9)'],
          borderColor: ['#10b981', '#ef4444'],
          borderWidth: 3,
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#fff', padding: 15, font: { size: 12 } }
          }
        }
      }
    });
  }

  createMarksChart(): void {
    if (!this.marksChartRef?.nativeElement) return;
    
    if (this.marksChart) {
      this.marksChart.destroy();
    }

    const ctx = this.marksChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = this.marksList.slice(0, 6).map((m, i) => `Exam ${i + 1}`);
    const data = this.marksList.slice(0, 6).map(m => m.mark || 0);

    this.marksChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.length > 0 ? labels : ['No Data'],
        datasets: [{
          label: 'Marks',
          data: data.length > 0 ? data : [0],
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: 'rgba(255,255,255,0.1)' },
            ticks: { color: '#fff' }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#fff' }
          }
        }
      }
    });
  }

  // Get upcoming exams
  getUpcomingExams(): any[] {
    const today = new Date();
    return this.examsList
      .filter(e => new Date(e.examDate) >= today)
      .slice(0, 3);
  }

  // Get recent marks
  getRecentMarks(): any[] {
    return this.marksList.slice(0, 5);
  }

  // Get grade from marks
  getGrade(mark: number): string {
    if (mark >= 90) return 'A+';
    if (mark >= 80) return 'A';
    if (mark >= 70) return 'B+';
    if (mark >= 60) return 'B';
    if (mark >= 50) return 'C';
    return 'F';
  }

  // Get grade color
  getGradeColor(mark: number): string {
    if (mark >= 80) return '#10b981';
    if (mark >= 60) return '#f59e0b';
    return '#ef4444';
  }

  // Logout
  openLogoutPopup(): void { 
    this.showLogoutPopup = true; 
  }
  
  confirmLogout(): void { 
    this.showLogoutPopup = false; 
    localStorage.clear(); 
    this.router.navigate(['/login']); 
  }
  
  cancelLogout(): void { 
    this.showLogoutPopup = false; 
  }
}
