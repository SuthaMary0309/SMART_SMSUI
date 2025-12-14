import { Component, signal } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { Navbar } from "./components/home/navbar/navbar";
import { LocationStrategy } from '@angular/common';
import { AiAssistant } from "./components/home/ai-assistant/ai-assistant";




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AiAssistant],
  templateUrl: './app.html',
  styleUrl: './app.css', 
})
export class App {
  protected readonly title = signal('smart-sms-school');


}



