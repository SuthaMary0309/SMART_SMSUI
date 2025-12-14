import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-parent-dashboard',
  imports:[FormsModule,RouterLink,CommonModule],
  templateUrl: './parent-dashboard.html',
  styleUrls: ['./parent-dashboard.css']
})
export class ParentDashboard {

  parentName: string = '';
  searchText: string = '';
  showLogoutPopup: boolean = false;

  // Current view - default dashboard
  activeView: string = 'dashboard';

  constructor(private router: Router) {}

  ngOnInit() {
    
    this.parentName = localStorage.getItem("parentName") || "Parent";
  }


  searchPage() {
    const text = this.searchText.toLowerCase().trim();

    if (text.includes('attendance')) {
      this.activeView = 'child-attendance';
    } else if (text.includes('exam') || text.includes('result')) {
      this.activeView = 'exam-results';
    } else if (text.includes('report') || text.includes('progress')) {
      this.activeView = 'progress-report';
    } else if (text.includes('notification')) {
      this.activeView = 'notifications';
    } else if (text.includes('teacher') || text.includes('contact')) {
      this.activeView = 'teacher-contact';
    } else if (text.includes('profile')) {
      this.activeView = 'profile';
    } else {
      alert('No matching section found!');
    }

   
    this.searchText = '';
  }


  goToDashboard()         { this.activeView = 'dashboard'; }
  goToChildAttendance()   { this.activeView = 'child-attendance'; }
  goToExamResults()       { this.activeView = 'exam-results'; }
  goToProgressReport()    { this.activeView = 'progress-report'; }
  goToNotifications()     { this.activeView = 'notifications'; }
  goToTeacherContact()    { this.activeView = 'teacher-contact'; }
  goToProfile()           { this.activeView = 'profile'; }

  // Logout Popup
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