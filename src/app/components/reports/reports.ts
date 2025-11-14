import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  imports: [],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports {
   [x: string]: any;
  constructor(private router: Router) {}
   
   goToReports() {
    this.router.navigate(['app-reports']);
  }
}
