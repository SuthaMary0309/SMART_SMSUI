// src/app/Service/attendance-service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AttendanceRequest {
  studentId: string;
  teacherId: string;
  classId: string;
  date: string;   // yyyy-MM-dd
  time?: string;  // HH:mm
  status: 'Present' | 'Absent';
  studentName?: string;
  teacherName?: string;
  className?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private api = 'https://smartsms.runasp.net/api/attendance';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.api}/get-all`);
  }

  add(att: AttendanceRequest) {
    return this.http.post(`${this.api}/add`, att);
  }

  delete(id: string) {
    return this.http.delete(`${this.api}/delete/${id}`);
  }
  getByStudentId(studentId: string) {
    return this.http.get<any[]>(`${this.api}/student/${studentId}`);
  }

}
