import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../Service/student-service';
import { StudentProfile } from "./profile/profile";
import { Exam } from "./exam/exam";
import { Attendance } from './attendance/attendance';
import { Reports } from '../reports/reports';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule,Attendance, Reports, StudentProfile, Exam],
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css']
})
export class StudentDashboard implements OnInit {
searchPage() {
throw new Error('Method not implemented.');
}


  userName: string = '';
  student: any = {}; // Only this student’s details
  showLogoutPopup: boolean = false;

  activeView: string = 'dashboard'; // << Add this line
  searchText: string = '';          // << Add this for search box binding

  constructor(private router: Router, private studentService: StudentService) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem("name") ?? "";
    const studentID = localStorage.getItem("studentID");

    if (studentID) {
      this.loadStudentDetails(studentID);
    } else {
      alert("Student not logged in!");
      this.router.navigate(['/login']);
    }
  }

  loadStudentDetails(id: string) {
    this.studentService.getById(id).subscribe({
      next: (res: any) => { this.student = res; },
      error: (err: any) => { 
        console.error("Failed to load student details", err);
        alert("Failed to load your details."); 
      }
    });
  }

  openLogoutPopup(): void { this.showLogoutPopup = true; }
  confirmLogout(): void { 
    this.showLogoutPopup = false; 
    localStorage.clear(); 
    this.router.navigate(['/login']); 
  }
  cancelLogout(): void { this.showLogoutPopup = false; }
}
  


  
  // Navigation
