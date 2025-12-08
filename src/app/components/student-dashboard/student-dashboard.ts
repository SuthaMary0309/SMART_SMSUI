import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Add this
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css'],
  imports: [RouterLink,CommonModule,FormsModule]
})
export class StudentDashboardComponent {
  userName = "";

  constructor(private router: Router) {}

  ngOnInit() {
    this.userName = localStorage.getItem("name") ?? "";
  }


    searchText: string = '';
    currentPage: string = '';

   searchPage() {
    const text = this.searchText.toLowerCase().trim();

    if (text.includes('exam')) {
      this.currentPage = 'exam';
    } else if (text.includes('report')) {
      this.currentPage = 'reports';
    } else if (text.includes('attendance')) {
      this.currentPage = 'attendance';
    } else if (text.includes('notification')) {
      this.currentPage = 'notification';
    } else {
      this.currentPage = '';
      alert('❌ No matching page found!');
    }
  }
    showLogoutPopup: boolean = false
  


   openLogoutPopup() {
    console.log("Logout popup opened!"); // 👈 check console for this
    this.showLogoutPopup = true;
    
  }
  

  goToProfile() {
    this.router.navigate(['/student-profile']);

  }

    goToReports() {
    this.router.navigate(['/reports']);
  }

   goToAttendance() {
    this.router.navigate(['/attendance']);
  }

  goToExamResults() {
    this.router.navigate(['/exam-results']);
  }

  goToNotifications() {
    this.router.navigate(['/notifications']);
  }

   confirmLogout() {
    this.showLogoutPopup = false;
    this.router.navigate(['/login']); // Go back to login page
  }

  cancelLogout() {
    this.showLogoutPopup = false; // Just close the popup
  }

}

