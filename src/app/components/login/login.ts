import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [ RouterLink,]
})
export class LoginComponent {
  router: any;
  goToRegister() {
   this.router.navigate('/register');
}
  goToLogin() {
  throw new Error('Method not implemented.');
}
  showRegister = false;

}

