import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Reports } from "../reports/reports";
import { StudentProfile } from "./profile/profile";
import { StudentAttendance } from "../admin-dashboard/manage-attendance/student-attendance/student-attendance";
import { Exam } from "./exam/exam";

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