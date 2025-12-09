import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../../Service/attendance-service';// make sure path is correct
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-attendance',
  imports: [FormsModule,CommonModule],
  templateUrl: './manage-attendance.html',
  styleUrls: ['./manage-attendance.css'],
})
export class ManageAttendance implements OnInit {
resetForm() {
throw new Error('Method not implemented.');
}

  students: any[] = [];
  selectedStudent: string = '';
  date: string = new Date().toISOString().split('T')[0]; // default today yyyy-MM-dd
  status: string = 'Present'; // default value

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.attendanceService.getStudents().subscribe({
      next: (res) => this.students = res,
      error: (err) => console.error('Error loading students', err)
    });
  }

  markAttendance() {
    if (!this.selectedStudent) {
      alert('Please select a student');
      return;
    }

    const attendance = {
      studentName: this.selectedStudent,
      date: this.date,
      status: this.status
    };

    this.attendanceService.markAttendance(attendance).subscribe({
      next: (res) => alert('Attendance marked successfully'),
      error: (err) => alert(err.error.message || 'Failed to mark attendance')
    });
  }
  
}
