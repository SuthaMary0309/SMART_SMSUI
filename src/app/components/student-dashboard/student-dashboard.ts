import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Reports } from "../reports/reports";
import { StudentProfile } from "./profile/profile";
import { StudentAttendance } from "../admin-dashboard/manage-attendance/student-attendance/student-attendance";
import { Exam } from "./exam/exam";
import { StudentService } from '../../Service/student-service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css'],
  imports: [RouterLink, CommonModule, FormsModule, Reports, StudentProfile, StudentAttendance, Exam,],
  standalone: true
})


export class StudentDashboardComponent {

  userName = "";
  searchText: string = '';
  showLogoutPopup: boolean = false;

  // Active view for sidebar navigation
  activeView: string = 'dashboard'; // default view

  constructor(private router: Router) {}

  ngOnInit() {
    this.userName = localStorage.getItem("name") ?? "Student";
  }

  // Search function - உன் original logic அப்படியே
  searchPage() {
    const text = this.searchText.toLowerCase().trim();

    if (text.includes('exam')) {
      this.activeView = 'exam';
    } else if (text.includes('report')) {
      this.activeView = 'reports';
    } else if (text.includes('attendance')) {
      this.activeView = 'attendance';
    } else if (text.includes('notification')) {
      this.activeView = 'notification';
    } else {
      this.activeView = 'dashboard'; // default
      alert('No matching page found!');
  styleUrls: ['./student-dashboard.css']
})
export class StudentDashboardComponent implements OnInit {

  userName: string = '';
  student: any = {}; // Only this student’s details
  showLogoutPopup: boolean = false;

  constructor(private router: Router, private studentService: StudentService) {}

  ngOnInit(): void {
    // Get logged-in student info from localStorage
    this.userName = localStorage.getItem("name") ?? "";
    const studentID = localStorage.getItem("studentID");

    if (studentID) {
      this.loadStudentDetails(studentID);
    } else {
      alert("Student not logged in!");
      this.router.navigate(['/login']);
    }
    this.searchText = ''; // clear search
  }

  // Sidebar Navigation - middle panel change ஆகும்
  goToAttendance()    { this.activeView = 'attendance'; }
  goToExamResults()   { this.activeView = 'exam-results'; }
  goToNotifications() { this.activeView = 'notification'; }
  goToReports()       { this.activeView = 'reports'; }
  goToProfile()       { this.activeView = 'profile'; }

  // Show dashboard home
  goToDashboard() {
    this.activeView = 'dashboard';
  }

  // Logout popup
  openLogoutPopup() {
    console.log("Logout popup opened!");
    this.showLogoutPopup = true;
  }

  confirmLogout() {
    this.showLogoutPopup = false;
    this.router.navigate(['/login']);
  }

  cancelLogout() {
    this.showLogoutPopup = false;
  }
}

  // Fetch only the logged-in student’s details
  loadStudentDetails(id: string) {
    this.studentService.getById(id).subscribe({
      next: (res: any) => {
        this.student = res;
      },
      error: (err: any) => {
        console.error("Failed to load student details", err);
        alert("Failed to load your details.");
      }
    });
  }

  // Logout popup controls
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

  // Navigation
  goToProfile(): void {
    this.router.navigate(['/student-profile']);
  }

  goToReports(): void {
    this.router.navigate(['/reports']);
  }

  goToAttendance(): void {
    this.router.navigate(['/attendance']);
  }

  goToExamResults(): void {
    this.router.navigate(['/exam-results']);
  }

  goToNotifications(): void {
    this.router.navigate(['/notifications']);
  }
}
