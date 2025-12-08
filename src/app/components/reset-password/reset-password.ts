import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../Service/login-service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css'],
  imports: [FormsModule]
})
export class ResetPassword {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private loginService = inject(LoginService);
  token = "";
  newPassword = "";

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get("token") ?? "";
  }

  resetPassword() {
    this.loginService.resetPassword(this.token, this.newPassword).subscribe({
      next: () => {
        alert("Password reset successful!");
        this.router.navigate(['/login']);
      },
      error: () => alert("Password reset failed")
    });
  }
  
}
