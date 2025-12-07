import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private api = 'http://localhost:5283/api/report'; // change port/url if needed
  constructor(private http: HttpClient) {}

  getStudentReport(studentId: string): Observable<any> {
    return this.http.get(`${this.api}/student/${studentId}`);
  }

  getExamReport(examId: string): Observable<any> {
    return this.http.get(`${this.api}/exam/${examId}`);
  }

  getClassPerformance(classId: string, examId: string): Observable<any> {
    return this.http.get(`${this.api}/class/${classId}/exam/${examId}`);
  }

  // helper endpoints — you likely already have these controllers:
  getAllStudents() { return this.http.get('http://localhost:5283/api/student/get-all'); }
  getAllClasses() { return this.http.get('http://localhost:5283/api/class/get-all'); }
  getAllExams() { return this.http.get('http://localhost:5283/api/exam/get-all'); }
}
