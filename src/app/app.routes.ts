import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './components/login/login';
import { RegisterComponent} from './components/register/register';
<<<<<<< HEAD
import { StudentDashboardComponent } from "./components/student-dashboard/student-dashboard";
import { StudentProfile } from './components/student-dashboard/profile/profile';
import { Reports } from './components/reports/reports';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';


=======
import { StudentDashboardComponent } from './student-dashboard/student-dashboard';
import { StudentProfile } from './student-profile/student-profile';
import { Attendance } from './components/student-dashboard/attendance/attendance';
>>>>>>> 0cd521ba74b051a28b1624e7444733f603094872

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'student-dasboard', component: StudentDashboardComponent},
  { path: 'student-profile', component: StudentProfile },
<<<<<<< HEAD
  { path: 'reports', component: Reports},
  { path: 'admin-dashboard', component: AdminDashboard },
=======
  { path: 'attendance', component: Attendance }
>>>>>>> 0cd521ba74b051a28b1624e7444733f603094872

];

