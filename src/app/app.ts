import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login";
import { RegisterComponent } from "./components/register/register";
<<<<<<< HEAD
import { StudentDashboardComponent } from "./components/student-dashboard/student-dashboard"
import {  Reports } from "./components/reports/reports";
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RegisterComponent, RouterOutlet, StudentDashboardComponent ,Reports],
=======
import { StudentDashboardComponent } from "./student-dashboard/student-dashboard";
import { Attendance } from "./components/student-dashboard/attendance/attendance";

@Component({
  selector: 'app-root',
  imports: [RegisterComponent, RouterOutlet, StudentDashboardComponent, Attendance],
>>>>>>> 0cd521ba74b051a28b1624e7444733f603094872
  templateUrl: './app.html',
  styleUrl: './app.css', 
})
export class App {
  protected readonly title = signal('smart-sms-school');

}


