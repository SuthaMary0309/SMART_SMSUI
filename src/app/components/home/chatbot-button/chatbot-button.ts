import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbot-button',
  templateUrl: './chatbot-button.html',
  styleUrls: ['./chatbot-button.css']
})
export class ChatbotButtonComponent {
  showPopup = false; // popup visible or not

  // Button click - open popup
  openPopup() {
    this.showPopup = true;
  }

  constructor() {}

  // openAI() {
  //   this.router.navigate(['/ai-assistant']);
  // }


}
