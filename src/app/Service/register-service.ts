import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private http = inject(HttpClient);
  private baseUrl = "http://localhost:5283/api/auth";


  register(userName: string, email: string, password: string, confirmpassword:string, role: string) {
    return this.http.post(`${this.baseUrl}/register`, {
      userName, email, password, role,confirmpassword
    });
}
}
