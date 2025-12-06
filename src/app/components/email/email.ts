import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../Service/email-service';

@Component({
  selector: 'app-email-crud',
  templateUrl: './email.html',
  styleUrls: ['./email.css'],
  imports: [FormsModule, CommonModule]
})
export class EmailCrud {

  private emailService = inject(EmailService);

  email: any = { to: '', subject: '', body: '' };
  message: string = '';

  sendEmail() {
    if (!this.email.to || !this.email.subject || !this.email.body) {
      alert("Please fill all fields.");
      return;
    }

    this.emailService.sendEmail(this.email).subscribe({
      next: (res: any) => {
        this.message = res.message || 'Email sent successfully!';
        this.resetForm();
      },
      error: (err) => {
        console.error('Email sending failed:', err);
        this.message = 'Email sending failed. Please try again.';
      }
    });
  }

  resetForm() {
    this.email = { to: '', subject: '', body: '' };
  }
}
