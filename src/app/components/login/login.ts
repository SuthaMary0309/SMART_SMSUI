import { Component } from '@angular/core';
import { RegisterComponent } from "../register/register";


@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [RegisterComponent]
})
export class LoginComponent {
goToRegister() {
throw new Error('Method not implemented.');
}
goToLogin() {
throw new Error('Method not implemented.');
}
  showRegister = false;

  toggleForm() {
    this.showRegister = !this.showRegister;
  }
}
