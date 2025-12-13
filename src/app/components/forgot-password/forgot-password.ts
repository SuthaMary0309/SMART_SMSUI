import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../Service/login-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css'],
  imports: [FormsModule,CommonModule,RouterLink]
})
export class ForgotPasswordComponent {

  private router = inject(Router);
  private loginService = inject(LoginService);

  email: string = '';

  requestReset() {
    if (!this.email) {
    alert('Please enter your email!');
    return;
  }

  console.log('Reset link sent to:', this.email);
  alert('Reset link sent! Check your email.');
  }
  
}
