import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AttendanceDTO {
  studentName: string;
  date: string;
  status: string; // "Present" or "Absent"
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://localhost:5283/api/attendance'; // your backend URL

  constructor(private http: HttpClient) {}

  markAttendance(attendance: AttendanceDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/mark-attendance`, attendance);
  }

  // optional: get students list if needed
  getStudents(): Observable<any> {
    return this.http.get('http://localhost:5283/api/student/get-all'); 
  }
}
