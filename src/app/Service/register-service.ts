import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private http = inject(HttpClient);
  private baseUrl = "http://localhost:5283/api/auth";


  register(userName: string, email: string, password: string, role: string, confirmPassword: string) {
    const body = {
      UserName: userName,            // must match C# property
      Email: email,
      Password: password,
      ConfirmPassword: confirmPassword, // match exact case
      Role: role
    };
  
    return this.http.post("http://localhost:5283/api/auth/register", body);
  }
  
}

