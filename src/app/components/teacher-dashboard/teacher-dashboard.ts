import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TeacherLayout } from './teacher-layout/teacher-layout';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.html',
  styleUrl: './teacher-dashboard.css',
})
export class TeacherDashboard {
  name = "";

  ngOnInit() {
    this.name = localStorage.getItem("name") ?? "";
  }


  Routerlink: any;
  goBack() {
    this.Routerlink.navigate(['/login']);
  }
}
