import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-layout',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './teacher-layout.html',
  styleUrl: './teacher-layout.css',
  standalone: true
})
export class TeacherLayout {
  isCollapsed = false;
  isDarkMode = false;
  userRole = ' teacher '; // Change based on login

  constructor(private router: Router) {}

  logout() {
    // Logout logic here
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }
}