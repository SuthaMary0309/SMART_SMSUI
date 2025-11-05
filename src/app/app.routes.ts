import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './components/login/login';
import { RegisterComponent} from './components/register/register';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard';
import { StudentProfile } from './student-profile/student-profile';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'student-dasboard', component: StudentDashboardComponent},
  { path: 'student-profile', component: StudentProfile },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
