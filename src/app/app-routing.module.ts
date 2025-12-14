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
  // This file is kept for compatibility but routes are defined in app.routes.ts
  // All routes should use AuthGuard and RoleGuard for security
  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
