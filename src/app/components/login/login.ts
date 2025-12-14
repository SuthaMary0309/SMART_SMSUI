import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../Service/login-service';
import { AuthService } from '../../Service/auth-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [FormsModule, RouterLink, CommonModule],
})
export class LoginComponent {

  private loginService = inject(LoginService);
  private authService = inject(AuthService);
  private router = inject(Router);

  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  loginUser() {
    // Validation
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      alert(this.errorMessage);
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email address';
      alert(this.errorMessage);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.loginService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        
        if (!res || !res.token) {
          this.errorMessage = 'Invalid response from server';
          alert('Login failed: Invalid response');
          return;
        }

        // Use AuthService to store token (handles both authToken and role)
        this.authService.saveToken(res.token);
        
        // Also store legacy token for backward compatibility
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role || '');

        // Store user details depending on role and navigate to appropriate dashboard
        const role = res.role || '';
        
        if (role === 'Student') {
          localStorage.setItem("studentID", res.studentID || '');
          localStorage.setItem("name", res.studentName || res.name || res.username || 'Student');
          this.router.navigate(['/student-dashboard']).then(() => {
            console.log('Navigated to Student Dashboard');
          });
        } else if (role === 'Admin') {
          localStorage.setItem("name", res.name || res.username || 'Admin');
          this.router.navigate(['/admin/dashboard']).then(() => {
            console.log('Navigated to Admin Dashboard');
          });
        } else if (role === 'Teacher') {
          localStorage.setItem("name", res.name || res.username || 'Teacher');
          this.router.navigate(['/teacher/dashboard']).then(() => {
            console.log('Navigated to Teacher Dashboard');
          });
        } else if (role === 'Parent') {
          localStorage.setItem("name", res.name || res.username || 'Parent');
          localStorage.setItem("parentName", res.name || res.username || 'Parent');
          this.router.navigate(['/parent-dashboard']).then(() => {
            console.log('Navigated to Parent Dashboard');
          });
        } else {
          this.errorMessage = 'Unknown user role. Please contact administrator.';
          alert(this.errorMessage);
          this.authService.logout();
          this.router.navigate(['/login']);
          return;
        }

        // Show success message
        console.log('Login successful for role:', role);
      },

      error: (err: any) => {
        this.isLoading = false;
        console.error('Login error:', err);
        
        let errorMsg = 'Login Failed';
        if (err.error?.message) {
          errorMsg += ': ' + err.error.message;
        } else if (err.error?.detail) {
          errorMsg += ': ' + err.error.detail;
        } else if (err.status === 401) {
          errorMsg = 'Invalid email or password';
        } else if (err.status === 0) {
          errorMsg = 'Unable to connect to server. Please check your connection.';
        } else if (err.status >= 500) {
          errorMsg = 'Server error. Please try again later.';
        }
        
        this.errorMessage = errorMsg;
        alert(errorMsg);
      }
    });
  }

  loginButton() {
    this.loginUser();
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
