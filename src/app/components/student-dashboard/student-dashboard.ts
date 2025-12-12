import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../Service/student-service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './student-dashboard.html',
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
