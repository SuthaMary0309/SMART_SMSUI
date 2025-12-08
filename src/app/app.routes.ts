import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// உன் existing imports (அப்படியே இருக்கு)
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
import { ManageParent } from './components/teacher-dashboard/manage-parent/manage-parent';
import { ManageReports } from './components/admin-dashboard/manage-reports/manage-reports';
import { ManageProfile } from './components/admin-dashboard/manage-profile/manage-profile';
import { RoleGuard } from './role-guard';
import { ParentDashboard } from './components/parent-dashboard/parent-dashboard';

// NEW: Admin Layout Component
import { AdminLayoutComponent } from './components/admin-dashboard/admin-layout/admin-layout';
import { AuthGuard } from './auth-guard';

export const routes: Routes = [

  // உன் existing routes அப்படியே இருக்கு (மாற்றல!)
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent },
  { path: 'student-dashboard', component: StudentDashboardComponent,canActivate: [AuthGuard] },
  { path: 'student-profile', component: StudentProfile,canActivate: [AuthGuard] },
  { path: 'reports', component: Reports,canActivate: [AuthGuard] },
  // { path: 'admin-dashboard', component: AdminDashboard },  // இது இனிமே தேவையில்லை (ஆனா வச்சிட்டேன்)
  { path: 'attendance', component: Attendance,canActivate: [AuthGuard] },
  { path: 'home', component: Home },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'student-dashboard', component: StudentDashboardComponent},
  { path: 'student-profile', component: StudentProfile },
  { path: 'reports', component: Reports},
  { path: 'admin-dashboard', component: AdminDashboard },
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
  { path: 'parent', component: ManageParent },
  { path: 'report', component: ManageReports },
  { path: 'adminprofile', component: ManageProfile },
  { path: 'admin-layout', component: AdminLayoutComponent,canActivate: [AuthGuard]},
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
  { path: 'report',component:ManageReports},
  { path:'profile',component:ManageProfile},
   // Login / Register
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
 
   // DASHBOARDS (Paste your code HERE)
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
 
   // OTHER MODULE ROUTES (if any)
   { path: 'manage-students', component: ManageStudents },
   { path: 'manage-teachers', component: ManageTeachers },
   { path: 'manage-parents', component: ManageParents },
 
   // Page not found
   { path: '**', redirectTo: 'login' }
];

  
  

  // NEW: Admin Panel with Layout (Sidebar + Topbar) - இது மட்டும் புதுசு!
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
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
      { path: 'parent', component: ManageParent },
      { path: 'report', component: ManageReports },
      { path: 'profile', component: ManageProfile },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Fallback
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }