import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../Service/login-service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css'],
  imports: [FormsModule]
})
export class ForgotPasswordComponent {

  private router = inject(Router);
  private loginService = inject(LoginService);

  email = "";

  requestReset() {
    this.loginService.forgotPassword(this.email).subscribe({
      next: () => {
        alert("Reset link sent to your email!");
        this.router.navigate(['/login']);
      },
      error: () => alert("Failed to send reset email")
    });
  }
  
}
