import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login";
import { RegisterComponent } from "./components/register/register";
import { StudentDashboardComponent } from "./components/student-dashboard/student-dashboard"
import {  Reports } from "./components/reports/reports";
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RegisterComponent, RouterOutlet, StudentDashboardComponent ,Reports],
  templateUrl: './app.html',
  styleUrl: './app.css', 
})
export class App {
  protected readonly title = signal('smart-sms-school');

}


