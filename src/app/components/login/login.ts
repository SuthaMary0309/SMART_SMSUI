import { Component, inject } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { LoginService } from '../../Service/login-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [FormsModule,RouterLink],
})
export class LoginComponent {

  private loginService = inject(LoginService);
  private router = inject(Router);

  email: string = '';
  password: string = '';

  loginUser() {
    this.loginService.login(this.email, this.password).subscribe({
      next: (res: any) => {
  
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);   // ✔ Store role
        localStorage.setItem("name", res.name);   // ✔ Store username
  
        alert("Login Success");
  
        // ✔ ROLE WISE REDIRECT
        if (res.role === 'Admin') {
          this.router.navigate(['/admin-layout']);
        } 
        else if (res.role === 'Teacher') {
          this.router.navigate(['/teacher-dashboard']);
        } 
        else if (res.role === 'Student') {
          this.router.navigate(['/student-dashboard']);
        } 
        else if (res.role === 'Parent') {
          this.router.navigate(['/parent-dashboard']);
        } 
        else {
          this.router.navigate(['/login']);
        }
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
