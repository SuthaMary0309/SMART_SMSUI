import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppRoutingModule } from "../../../app-routing.module";
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  
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
