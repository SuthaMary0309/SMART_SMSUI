import { HttpClient } from '@angular/common/http';
import { inject,Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient)

  AddUser(userName:string,age:number,email:string,role:string){
    return this.http.post(`http://localhost:5283/api/user/add?userName=${userName}&age=${age}&email=${email}&role=${role}`,"")
  }
  getAllUsers(){
    return this.http.get(`http://localhost:5283/api/user/get-all`)
  }
}
