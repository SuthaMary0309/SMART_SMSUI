import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './components/login/login';
import { RegisterComponent} from './components/register/register';
import { StudentDashboardComponent } from "./components/student-dashboard/student-dashboard";
import { StudentProfile } from './components/student-dashboard/profile/profile';
import { Reports } from './components/reports/reports';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';



export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'student-dasboard', component: StudentDashboardComponent},
  { path: 'student-profile', component: StudentProfile },
  { path: 'reports', component: Reports},
  { path: 'admin-dashboard', component: AdminDashboard },

];

