import { Component } from '@angular/core';
import { EmailService } from '../../../Service/email-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-email',
  imports: [FormsModule
    
  ],
  templateUrl: './manage-email.html',
  styleUrl: './manage-email.css',
})
export class ManageEmail {

  emailData = {
    to: '',
    subject: '',
    body: ''
  };

  constructor(private emailService: EmailService) {}

  send() {
    if (!this.emailData.to || !this.emailData.subject || !this.emailData.body) {
      alert("All fields are required");
      return;
    }

    this.emailService.sendEmail(this.emailData).subscribe({
      next: () => {
        alert("Email sent successfully!");
        this.emailData = { to: '', subject: '', body: '' };
      },
      error: (err) => {
        console.error("Email sending failed:", err);
        alert("Failed to send email");
      }
    });
  }

}