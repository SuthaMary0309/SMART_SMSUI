import { Component } from '@angular/core';
import { AiService } from '../../../Service/ai';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-assistant',
  templateUrl:'./ai-assistant.html',
  styleUrls: ['./ai-assistant.css'],
  imports: [FormsModule,CommonModule],
  standalone: true
})
export class AiAssistant {
  messages: { from: 'you' | 'bot'; text: string }[] = [
    { from: 'bot', text: 'Hello! How can I help you today? 👋' }
  ];

  inputText = '';
  showChat = false;

  constructor(private ai: AiService) {}

  toggleChat() {
    this.showChat = !this.showChat;
  }

  sendMessage() {
    if (!this.inputText.trim()) return;

    const userMessage = this.inputText;
    this.messages.push({ from: 'you', text: userMessage });
    this.inputText = '';

    this.ai.askAI(userMessage).subscribe({
      next: (res) => {
        this.messages.push({ from: 'bot', text: res.response });
      },
      error: () => {
        this.messages.push({
          from: 'bot',
          text: '❗ Error connecting to AI server.'
        });
      }
    });
  }
}
