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
import { StudentExamsComponent } from './student-dashboard/student-exams-component/student-exams-component';

export const routes: Routes = [
  // Public routes (no authentication required)
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPassword },
  { path: 'ai-assistant', component: AiAssistant },

  // Admin Layout with protected children
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] },
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

  // Teacher Layout with protected children
  {
    path: 'teacher',
    component: TeacherLayout,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Teacher'] },
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

  // Student routes (protected)
  {
    path: 'student-dashboard',
    component: StudentDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Student'] }
  },
  {
    path: 'student-profile',
    component: StudentProfile,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Student'] }
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Student'] }
  },
  {
    path: 'attendance',
    component: Attendance,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Student'] }
  },
  {
    path: 'exam-results',
    component: Exam,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Student'] }
  },
  {
    path: 'reports',
    component: Reports,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Student'] }
  },
  {
    path: 'student-exams',
    component: StudentExamsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Student'] }
  },

  // Parent Dashboard (protected)
  {
    path: 'parent-dashboard',
    component: ParentDashboard,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Parent'] }
  },

  // Legacy dashboard routes (redirect to new layout)
  {
    path: 'admin-dashboard',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'teacher-dashboard',
    redirectTo: 'teacher/dashboard',
    pathMatch: 'full'
  },

  // Fallback - redirect to login
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
