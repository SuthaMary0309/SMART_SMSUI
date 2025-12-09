import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private baseUrl = "http://localhost:5283/api/auth";

  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post(`${this.baseUrl}/login`, body);
  }
  

  forgotPassword(email: string) {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email });
  }
  
  resetPassword(token: string, newPassword: string) {
    return this.http.post(`${this.baseUrl}/reset-password`
    
    , {
      token,
      newPassword
    });
  
}
}