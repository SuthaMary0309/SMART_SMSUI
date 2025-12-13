import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.html',
  styleUrls: ['./reports.css'],
  imports: [FormsModule,CommonModule]
})
export class Reports implements OnInit {
  @Input() studentId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.studentId = params['studentId'];
      if (!this.studentId) {
        console.warn('No student ID provided');
      }
    });
  }
}
