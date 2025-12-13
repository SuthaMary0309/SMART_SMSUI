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
        if (res.role === 'Student') {
          localStorage.setItem("studentID", res.studentID);  // Make sure backend returns this
          localStorage.setItem("name", res.studentName);     // Greeting name
          this.router.navigate(['/student-dashboard']);
        } else if (res.role === 'Admin') {
          localStorage.setItem("name", res.name);
          this.router.navigate(['/admin-layout']);
        } else if (res.role === 'Teacher') {
          localStorage.setItem("name", res.name);
          this.router.navigate(['/teacher-layout']);
        } else if (res.role === 'Parent') {
          localStorage.setItem("name", res.name);
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
