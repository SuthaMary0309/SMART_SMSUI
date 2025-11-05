import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css']
})
export class StudentDashboardComponent {
[x: string]: any;
  constructor(private router: Router) {}

  goToProfile() {
    this.router.navigate(['/student-profile']);
  }
}
