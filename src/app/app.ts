import { Component, signal } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { Navbar } from "./components/home/navbar/navbar";
import { LocationStrategy } from '@angular/common';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet,],
  templateUrl: './app.html',
  styleUrl: './app.css', 
})
export class App {
  protected readonly title = signal('smart-sms-school');


}



