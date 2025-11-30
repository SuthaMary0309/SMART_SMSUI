import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { RoleGuard } from './role-guard';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { TeacherDashboard } from './components/teacher-dashboard/teacher-dashboard';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard';
import { LoginComponent } from './components/login/login';
import { ParentDashboard } from './components/parent-dashboard/parent-dashboard';

const routes: Routes = [

  // ADMIN routes
  {
    path: "admin",
    component: AdminDashboard,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },

  // TEACHER routes
  {
    path: "teacher",
    component: TeacherDashboard,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Teacher'] }
  },

  // STUDENT routes
  {
    path: "student",
    component: StudentDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Student'] }
  },

  // PARENT routes
 {
    path: "parent",
    component: ParentDashboard,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Parent'] }
  },

  // Login
  { path: "login", component: LoginComponent },

  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
