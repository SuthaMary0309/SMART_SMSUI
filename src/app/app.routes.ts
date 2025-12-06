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
import { ManageAttendance } from './components/admin-dashboard/manage-attendance/manage-attendance';
import { EmailCrud } from './components/email/email';
import { ManageTeachers } from './components/admin-dashboard/manage-teachers/manage-teachers';
import { ManageExam } from './components/admin-dashboard/manage-exam/manage-exam';
import { TeacherDashboard } from './components/teacher-dashboard/teacher-dashboard';
import { ManageStudents } from './components/teacher-dashboard/manage-students/manage-students';
import { ManageClass } from './components/admin-dashboard/manage-class/manage-class';
import { ManageSubject } from './components/admin-dashboard/manage-subject/manage-subject';
import { ManageMarks } from './components/admin-dashboard/manage-marks/manage-marks';
import { ManageEmail } from './components/admin-dashboard/manage-email/manage-email';
import { ManageNotification } from './components/admin-dashboard/manage-notification/manage-notification';
import { ManageParents } from './components/admin-dashboard/manage-parents/manage-parents';
import { ManageReports } from './components/admin-dashboard/manage-reports/manage-reports';
import { ManageProfile } from './components/admin-dashboard/manage-profile/manage-profile';



export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'student-dashboard', component: StudentDashboardComponent},
  { path: 'student-profile', component: StudentProfile },
  { path: 'reports', component: Reports},
  { path: 'admin-dashboard', component: AdminDashboard },
  { path: 'attendance', component: Attendance},
  { path: 'home', component:Home },
  { path: 'forgot-password',component: ForgotPasswordComponent},
  { path: 'reset-password',component: ResetPasswordComponent},
  { path: 'student-profile', component: StudentProfile },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'attendance_2', component:ManageAttendance},
  { path: 'email',component: EmailCrud},
  { path: 'teacher',component:ManageTeachers},
  { path: 'exam',component: ManageExam},
  { path:'student',component:ManageStudents},
  { path:'teacher-dashboard',component: TeacherDashboard},
  { path:'class', component: ManageClass},
  { path:'subject', component:ManageSubject},
  { path: 'marks', component:ManageMarks},
  { path: 'email', component:ManageEmail},
  { path : 'notification', component:ManageNotification },
  { path: 'parent',component: ManageParents},
  { path: 'reports',component:ManageReports},
  { path:'profile',component:ManageProfile}
];

  
  

  


