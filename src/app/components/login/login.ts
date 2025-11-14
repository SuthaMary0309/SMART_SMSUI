import { Component } from '@angular/core';
import { RegisterComponent } from "../register/register";
import { routes } from '../../app.routes';


@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [RegisterComponent]
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

