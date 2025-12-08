import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [RouterLink],
  templateUrl: './teacher-dashboard.html',
  styleUrl: './teacher-dashboard.css',
})
export class TeacherDashboard {
  Routerlink: any;
  goBack() {
    this.Routerlink.navigate(['/login']);
  }
}
