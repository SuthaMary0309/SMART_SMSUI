import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://localhost:5283/api/email/send';

  constructor(private http: HttpClient) { }

  sendEmail(emailData: any) {
    return this.http.post(this.apiUrl, emailData);
  }
}

