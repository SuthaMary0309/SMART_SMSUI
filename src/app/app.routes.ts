import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { StudentDashboardComponent } from "./components/student-dashboard/student-dashboard";
import { StudentProfile } from './components/student-dashboard/profile/profile';
import { Reports } from './components/reports/reports';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { Attendance } from './components/student-dashboard/attendance/attendance';
import { Home } from './components/home/home';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password';
import { ResetPassword } from './components/reset-password/reset-password';
import { EditProfileComponent } from './components/student-dashboard/profile/edit-profile/edit-profile';
import { Exam } from './components/student-dashboard/exam/exam';
import { ManageTeachers } from './components/admin-dashboard/manage-teachers/manage-teachers';
import { ManageStudents } from './components/teacher-dashboard/manage-students/manage-students';
import { ManageClass } from './components/admin-dashboard/manage-class/manage-class';
import { ManageAttendance } from './components/admin-dashboard/manage-attendance/manage-attendance';
import { ManageSubject } from './components/admin-dashboard/manage-subject/manage-subject';
import { ManageNotification } from './components/admin-dashboard/manage-notification/manage-notification';
import { ManageExam } from './components/admin-dashboard/manage-exam/manage-exam';
import { ManageMarks } from './components/admin-dashboard/manage-marks/manage-marks';
import { ManageEmail } from './components/admin-dashboard/manage-email/manage-email';
import { ManageReports } from './components/admin-dashboard/manage-reports/manage-reports';
import { ManageProfile } from './components/admin-dashboard/manage-profile/manage-profile';
import { RoleGuard } from './role-guard';
import { ParentDashboard } from './components/parent-dashboard/parent-dashboard';
import { AuthGuard } from './auth-guard';
import { AiAssistant } from './components/home/ai-assistant/ai-assistant';
import { TeacherDashboard } from './components/teacher-dashboard/teacher-dashboard';
import { AdminLayoutComponent } from './components/admin-dashboard/admin-layout/admin-layout';
import { ManageParents } from './components/admin-dashboard/manage-parents/manage-parents';
import { TeacherLayout } from './components/teacher-dashboard/teacher-layout/teacher-layout';

export const routes: Routes = [


  // Auth
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'student-dashboard', component: StudentDashboardComponent },
  { path: 'student-profile', component: StudentProfile },
  { path: 'reports', component: Reports },
  { path: 'attendance', component: Attendance },
  { path: 'home', component: Home },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPassword },
  { path: 'student-dashboard', component: StudentDashboardComponent},
  { path: 'student-profile', component: StudentProfile },
  { path: 'reports', component: Reports},
  // { path: 'admin-dashboard', component: AdminDashboard },
  { path: 'attendance', component: Attendance},
  { path: 'home', component:Home },
  { path: 'forgot-password',component: ForgotPasswordComponent},
  { path: 'reset-password',component: ResetPassword},
  { path: 'student-profile', component: StudentProfile },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'exam-results', component: Exam },
  { path: 'teachers', component: ManageTeachers },
  { path: 'students', component: ManageStudents },
  { path: 'class', component: ManageClass },
  { path: 'attendance_2', component: ManageAttendance },
  { path: 'subject', component: ManageSubject },
  { path: 'notification', component: ManageNotification },
  { path: 'exam', component: ManageExam },
  { path: 'marks', component: ManageMarks },
  { path: 'email', component: ManageEmail },
  { path: 'parent', component: ManageParents },
  { path: 'report', component: ManageReports },
  { path: 'adminprofile', component: ManageProfile },
  { path: 'admin-layout', component: AdminLayoutComponent,},
  { path: 'ai-assistant', component: AiAssistant},


    // new layout
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPassword },
  { path: 'admin-layout', component: AdminLayoutComponent},
  { path: 'teacher-layout', component: TeacherLayout},

  // Dashboards with RoleGuard
  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    canActivate: [RoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'student-dashboard',
    component: StudentDashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Student'] }
  },
  {
    path: 'teacher-dashboard',
    component: TeacherDashboard,
    canActivate: [RoleGuard],
    data: { roles: ['Teacher'] }
  },
  {
    path: 'parent-dashboard',
    component: ParentDashboard,
    canActivate: [RoleGuard],
    data: { roles: ['Parent'] }
  },

  // Student routes
  { path: 'student-profile', component: StudentProfile, canActivate: [AuthGuard] },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'attendance', component: Attendance, canActivate: [AuthGuard] },
  { path: 'exam-results', component: Exam, canActivate: [AuthGuard] },
  { path: 'reports', component: Reports, canActivate: [AuthGuard] },

  // Home
  { path: 'home', component: Home },

  // Admin Layout with children
  {
    path: 'admin',
    component: AdminLayoutComponent,

      
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: 'teachers', component: ManageTeachers },
      { path: 'students', component: ManageStudents },
      { path: 'class', component: ManageClass },
      { path: 'attendance', component: ManageAttendance },
      { path: 'subject', component: ManageSubject },
      { path: 'notification', component: ManageNotification },
      { path: 'exam', component: ManageExam },
      { path: 'marks', component: ManageMarks },
      { path: 'email', component: ManageEmail },
      { path: 'parent', component: ManageParents },
      { path: 'report', component: ManageReports },
      { path: 'profile', component: ManageProfile },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  {
    path: 'teacher',
    component: TeacherLayout,

      
    children: [
      { path: 'dashboard', component: TeacherDashboard },
      { path: 'students', component: ManageStudents },
      { path: 'class', component: ManageClass },
      { path: 'attendance', component: ManageAttendance },
      { path: 'subject', component: ManageSubject },
      { path: 'notification', component: ManageNotification },
      { path: 'exam', component: ManageExam },
      { path: 'marks', component: ManageMarks },
      { path: 'email', component: ManageEmail },
      { path: 'parent', component: ManageParents },
      { path: 'report', component: ManageReports },
      { path: 'profile', component: ManageProfile },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Fallback
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
