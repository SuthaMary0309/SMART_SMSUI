import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Reports } from "../reports/reports";
import { StudentProfile } from "./profile/profile";
import { StudentAttendance } from "../admin-dashboard/manage-attendance/student-attendance/student-attendance";

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css'],
  imports: [RouterLink, CommonModule, FormsModule, Reports, StudentProfile, StudentAttendance, ],
  standalone: true
})

  export class StudentDashboardComponent {

    userName: string = '';
    searchText: string = '';
    showLogoutPopup: boolean = false;
  
    // Current view
    activeView: string = 'dashboard'; // default
  
    constructor(private router: Router) {}
  
    ngOnInit() {
      this.userName = localStorage.getItem("name") || "Student";
    }
  
    // Search Function
    searchPage() {
      const text = this.searchText.toLowerCase().trim();
  
      if (text.includes('exam')) {
        this.activeView = 'exam';
      } else if (text.includes('report')) {
        this.activeView = 'reports';
      } else if (text.includes('attendance')) {
        this.activeView = 'attendance';
      } else if (text.includes('notification')) {
        this.activeView = 'notifications';
      } else if (text.includes('profile')) {
        this.activeView = 'profile';
      } else {
        alert('No matching page found!');
      }
      this.searchText = '';
    }
  
    // Sidebar Navigation - Change View
    goToDashboard()     { this.activeView = 'dashboard'; }
    goToAttendance()    { this.activeView = 'attendance'; }
    goToExamResults()   { this.activeView = 'exam'; }
    goToNotifications() { this.activeView = 'notifications'; }
    goToReports()       { this.activeView = 'reports'; }
    goToProfile()       { this.activeView = 'profile'; }
  
    // Logout
    openLogoutPopup() {
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

