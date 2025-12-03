import { Component } from '@angular/core';
import {  RouterLink } from "@angular/router";
import { EmailService } from '../../Service/email-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email',
  templateUrl: './email.html',
  imports: [FormsModule],
})
export class EmailComponent {

  email = {
    to: '',
    subject: '',
    body: ''
  };

  constructor(private emailService: EmailService) {}

  send() {
    this.emailService.sendEmail(this.email).subscribe({
      next: res => alert("Email Sent!"),
      error: err => alert("Error sending email")
    });
  }
}

