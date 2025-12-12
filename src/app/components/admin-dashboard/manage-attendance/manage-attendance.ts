// src/app/components/manage-attendance/manage-attendance.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AttendanceService } from '../../../Service/attendance-service';
import { StudentService } from '../../../Service/student-service';
import { TeacherService } from '../../../Service/teacher-service';
import { ClassService } from '../../../Service/class-service';

@Component({
  selector: 'app-manage-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-attendance.html',
  styleUrls: ['./manage-attendance.css']
})
export class ManageAttendance implements OnInit {
showSuccess: any;

  // dropdown data
  students: any[] = [];
  teachers: any[] = [];
  classes: any[] = [];

  // attendance list from backend
  attendanceList: any[] = [];

  // form model
  model = {
    studentId: '',
    teacherId: '',
    classId: '',
    date: '',    // yyyy-MM-dd
    time: '',    // HH:mm
    status: 'Present' as 'Present' | 'Absent'
  };

  isSubmitting = false;
  searchKey = '';

  constructor(
    private attendanceService: AttendanceService,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    this.loadDropdowns();
    this.loadAttendance();
  }

  loadDropdowns() {
    this.studentService.getAll().subscribe((res: any) => this.students = res || []);
    this.teacherService.getAll().subscribe((res: any) => this.teachers = res || []);
    this.classService.getAll().subscribe((res: any) => this.classes = res || []);
  }

  loadAttendance() {
    this.attendanceService.getAll().subscribe((res: any) => {
      this.attendanceList = (res || []).map((r: any) => ({
        ...r,
        displayDate: r.date ? (new Date(r.date)).toLocaleDateString() : '',
      }));
    });
  }

  // front-end validation
  validateForm(): boolean {
    if (!this.model.studentId) { alert('Select student'); return false; }
    if (!this.model.teacherId) { alert('Select teacher'); return false; }
    if (!this.model.classId) { alert('Select class'); return false; }
    if (!this.model.date) { alert('Select date'); return false; }

    // date not in future
       const selected = new Date(this.model.date);
       const today = new Date();
       today.setHours(0,0,0,0);
       if (selected < today) { alert('Date cannot be in the future'); return false; }

    // time optional — if provided should match HH:mm
    if (this.model.time && !/^\d{2}:\d{2}$/.test(this.model.time)) {
      alert('Time must be in HH:mm format');
      return false;
    }

    // mark duplicate on front-end: same student + same date
    const dup = this.attendanceList.some(a =>
      a.studentId === this.model.studentId &&
      // store comparing string in 'date' (yyyy-MM-dd) to be consistent
      (a.date?.split('T')[0] || a.date) === this.model.date
    );
    if (dup) {
      alert('Attendance for this student on selected date already exists (frontend check).');
      return false;
    }

    return true;
  }

  submit() {
    if (!this.validateForm()) return;

    this.isSubmitting = true;

    // prepare payload: include names for Sheet readability (optional)
    const student = this.students.find(s => s.studentID === this.model.studentId);
    const teacher = this.teachers.find(t => t.teacherID === this.model.teacherId);
    const cls = this.classes.find(c => c.classID === this.model.classId);

    const payload = {
      studentId: this.model.studentId,
      teacherId: this.model.teacherId,
      classId: this.model.classId,
      date: this.model.date,
      time: this.model.time || (new Date()).toTimeString().substring(0,5),
      status: this.model.status,
      studentName: student ? (student.studentName || `${student.firstName || ''} ${student.lastName || ''}`) : '',
      teacherName: teacher ? (teacher.teacherName || `${teacher.firstName || ''} ${teacher.lastName || ''}`) : '',
      className: cls ? (cls.className + ' (Grade ' + (cls.grade ?? '') + ')') : ''
    };

    this.attendanceService.add(payload).subscribe({
      next: () => {
        alert('Attendance saved!');
        this.loadAttendance();
        this.resetForm();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Add attendance failed', err);
        if (err?.status === 409) alert(err?.error ?? 'Duplicate attendance (backend)');
        else alert('Failed to save attendance');
        this.isSubmitting = false;
      }
    });
  }

  delete(attId: string) {
    if (!confirm('Delete this attendance entry?')) return;
    this.attendanceService.delete(attId).subscribe({
      next: () => {
        this.loadAttendance();
      },
      error: () => alert('Failed to delete')
    });
  }

  resetForm() {
    this.model = {
      studentId: '',
      teacherId: '',
      classId: '',
      date: '',
      time: '',
      status: 'Present'
    };
  }

  // client-side search filter (search on student/teacher/class)
  get filteredAttendance() {
    const key = this.searchKey.trim().toLowerCase();
    if (!key) return this.attendanceList;
    return this.attendanceList.filter(a =>
      (a.studentName || '').toLowerCase().includes(key) ||
      (a.teacherName || '').toLowerCase().includes(key) ||
      (a.className || '').toLowerCase().includes(key) ||
      (a.status || '').toLowerCase().includes(key)
    );
  }
}
