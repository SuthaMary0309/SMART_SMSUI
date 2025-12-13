import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../Service/login-service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css'],
  imports: [FormsModule,RouterLink]
})
export class ResetPassword {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private loginService = inject(LoginService);
  token = "";
  newPassword: string = '';

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get("token") ?? "";
  }


resetPassword() {
  if (!this.newPassword) {
    alert('Please enter a new password!');
    return;
  }

  console.log('Password reset for:', this.newPassword);
  alert('Password reset successful!');
  this.router.navigate(['/login']);
}
  
}
