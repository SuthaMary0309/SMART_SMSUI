import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private baseUrl = 'https://smartsms.runasp.net/api/report'; // change port to your API

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/students`);
  }
  getAllExams(): Observable<any> {
    return this.http.get(`${this.baseUrl}/exams`);
  }
  getAllClasses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/classes`);
  }

  getStudentReport(studentId: string) {
    return this.http.get(`${this.baseUrl}/student/${studentId}`);
  }
  getGrade(mark: number): string {
    if (mark >= 90) return "A";
    if (mark >= 80) return "B";
    if (mark >= 70) return "C";
    if (mark >= 60) return "D";
    return "F";
  }
  
  
}
