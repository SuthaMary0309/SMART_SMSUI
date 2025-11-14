import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  constructor(private router: Router) {}

  goToLogin() {
       window.open('/login')
  }
}
