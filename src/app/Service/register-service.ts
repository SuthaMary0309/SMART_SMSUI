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
      userName,
      email,
      password,
      confirmPassword,
      role,
      admissionNumber: null
    };
  
    // No headers needed for anonymous registration
    return this.http.post(`${this.baseUrl}/register`, body);
  }
  
  
}

