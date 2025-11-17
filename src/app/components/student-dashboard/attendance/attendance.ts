import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-attendance',
  imports: [RouterLink],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
})
export class Attendance {
lineChartData: any;
lineChartOptions: any;
totalLate: any;

}
