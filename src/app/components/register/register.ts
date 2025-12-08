import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../Service/register-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [FormsModule,RouterLink],
})
export class RegisterComponent {

  private registerService = inject(RegisterService);
  private router = inject(Router);

  userName = "";
  password = "";
  email = "";
  role = "";
  confirmpassword ="";

  registerUser() {
    this.registerService.register(
      this.userName,
      this.email,
      this.password,
      this.role,
      this.confirmpassword
    ).subscribe({
      next: res => {
        alert("Registered Successfully");
        this.router.navigate(['/login']);
      },
      error: err => {
        console.log("FULL ERROR RESPONSE:", err);        // <-- Add this
        console.log("ERROR BODY:", err.error);           // <-- Add this
        console.log("VALIDATION ERRORS:", err.error?.errors);  // <-- Add this
        alert("Registration Failed - check console!");
      }
    });
  }
  
      
    
  

  registerButton() {
    this.registerUser();
  }
}
