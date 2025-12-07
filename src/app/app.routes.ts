import { NgModule } from '@angular/core';
import {  Routes } from '@angular/router';
import { LoginComponent} from './components/login/login';
import { RegisterComponent} from './components/register/register';
import { StudentDashboardComponent } from "./components/student-dashboard/student-dashboard";
import { StudentProfile } from './components/student-dashboard/profile/profile';
import { Reports } from './components/reports/reports';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { Attendance } from './components/student-dashboard/attendance/attendance';
import { Home } from './components/home/home';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password';
import { ResetPasswordComponent } from './components/reset-password/reset-password';
import { EditProfileComponent } from './components/student-dashboard/profile/edit-profile/edit-profile';
import { Exam } from './components/student-dashboard/exam/exam';




export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'student-dashboard', component: StudentDashboardComponent},
  { path: 'student-profile', component: StudentProfile },
  { path: 'reports', component: Reports},
  { path: 'admin-dashboard', component: AdminDashboard },
  { path: 'attendance', component: Attendance},
  { path: 'home', component: Home },
  { path: 'forgot-password',component: ForgotPasswordComponent},
  { path: 'reset-password',component: ResetPasswordComponent},
  { path: 'student-profile', component: StudentProfile },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'exam-results', component: Exam}
  
  
];

  
  

  


