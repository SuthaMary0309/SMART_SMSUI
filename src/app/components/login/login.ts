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
        localStorage.setItem('token', res.token);
        alert("Login Success");
        this.router.navigate(['/dashboard']);   // navigate to homepage
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
