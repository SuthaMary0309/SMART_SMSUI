import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { UserService } from '../../Service/user-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink,FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private Userservice = inject(UserService);
  userName:string ="";
  age:number = 0;
  email:string = "";
  role:string ="";

AddUser(){
  this.Userservice.AddUser(this.userName,this.age,this.email,this.role).subscribe({
    next :res =>{
      console.log('Response:,res');
      alert('User Added');
    },
    error:(err) => {
      console.error('Error:',err);
      alert('Error Adding User')
    }
  });
}

AddUserButton(){
  this.AddUser()
}
}
