import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { About } from "./about/about";
import { Navbar } from "./navbar/navbar";

@Component({
  selector: 'app-home',
  imports: [FormsModule, Navbar, About],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {


  @ViewChild('aboutSection') aboutSection!: ElementRef;

  scrollToAbout() {
    if(this.aboutSection) {
      this.aboutSection.nativeElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }
}
