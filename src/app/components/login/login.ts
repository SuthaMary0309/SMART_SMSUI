import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../Service/login-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [FormsModule, RouterLink],
})
export class LoginComponent {

  private loginService = inject(LoginService);
  private router = inject(Router);
  private tokenKey = "authToken";
  email: string = '';
  password: string = '';

  loginUser() {
    this.loginService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        

        // Always store token & role
        localStorage.setItem("authToken", res.token);
        localStorage.setItem("role", res.role);
       

        // Store user details depending on role
        // Always store username as fallback
        localStorage.setItem("username", res.username || '');
        
        if (res.role === 'Student') {
          localStorage.setItem("studentID", res.studentID || '');
          localStorage.setItem("name", res.studentName || res.name || res.username || '');
          this.router.navigate(['/student-dashboard']);
        } else if (res.role === 'Admin') {
          localStorage.setItem("name", res.name || res.username || '');
          this.router.navigate(['/admin/dashboard']);
        } else if (res.role === 'Teacher') {
          localStorage.setItem("teacherID", res.teacherID || '');
          localStorage.setItem("name", res.name || res.username || '');
          this.router.navigate(['/teacher/dashboard']);
        } else if (res.role === 'Parent') {
          localStorage.setItem("parentID", res.parentID || '');
          localStorage.setItem("name", res.name || res.username || '');
          this.router.navigate(['/parent-dashboard']);
        } else {
          this.router.navigate(['/login']);
        }

        alert("Login Success");
      },

      error: err => {
        alert("Login Failed");
      }
    });
  }

  loginButton() {
    this.loginUser();
  }
}
