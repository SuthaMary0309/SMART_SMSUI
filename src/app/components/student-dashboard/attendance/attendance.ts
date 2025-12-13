import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AttendanceService } from '../../../Service/attendance-service';

@Component({
  selector: 'app-student-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance.html',
  styleUrls: ['./attendance.css'],
})
export class Attendance implements OnInit {

  @Input() studentId!: string;

  attendanceList: any[] = [];

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    if (!this.studentId) {
      console.warn('Student ID not received');
      return;
    }

    this.attendanceService
      .getByStudentId(this.studentId)
      .subscribe({
        next: (res) => {
          this.attendanceList = res;
        },
        error: (err) => {
          console.error('Attendance load failed', err);
        }
      });
  }
}
