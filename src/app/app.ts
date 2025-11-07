import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login";
import { RegisterComponent } from "./components/register/register";
import { StudentDashboardComponent } from "./student-dashboard/student-dashboard";
import { Attendance } from "./components/student-dashboard/attendance/attendance";

@Component({
  selector: 'app-root',
  imports: [RegisterComponent, RouterOutlet, StudentDashboardComponent, Attendance],
  templateUrl: './app.html',
  styleUrl: './app.css', 
})
export class App {
  protected readonly title = signal('smart-sms-school');
}


