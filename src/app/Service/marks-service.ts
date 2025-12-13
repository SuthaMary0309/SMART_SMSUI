import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarksService {

  private apiUrl = 'https://smartsms.runasp.net/api/Marks';

  constructor(private http: HttpClient) {}

  getAllMarks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-all`);
  }

  addMarks(grade: number, mark: number, studentID: string, examID: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add?grade=${grade}&mark=${mark}&studentID=${studentID}&examID=${examID}`, {});
  }

  updateMarks(id: string, grade: number, mark: number, studentID: string, examID: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}?grade=${grade}&mark=${mark}&studentID=${studentID}&examID=${examID}`, {});
  }

  deleteMarks(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
