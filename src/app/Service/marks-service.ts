import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Marks {
  marksId: string;
  grade: number;
  mark: number;
  studentID: string;
  examID: string;
}

@Injectable({
  providedIn: 'root'
})
export class MarksService {
  private apiUrl = 'https://localhost:5001/api/Marks'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // 🟢 Get all marks
  getAllMarks(): Observable<Marks[]> {
    return this.http.get<Marks[]>(`${this.apiUrl}/get-all`);
  }

  // 🟡 Get marks by ID
  getMarksById(id: string): Observable<Marks> {
    return this.http.get<Marks>(`${this.apiUrl}/get/${id}`);
  }

  // 🟣 Add marks
  addMarks(grade: number, mark: number, studentID: string, examID: string): Observable<Marks> {
    return this.http.post<Marks>(`${this.apiUrl}/add`, {
      grade,
      mark,
      studentID,
      examID
    });
  }

  // 🔵 Update marks
  updateMarks(id: string, grade: number, mark: number, studentID: string, examID: string): Observable<Marks> {
    return this.http.put<Marks>(`${this.apiUrl}/update/${id}`, {
      grade,
      mark,
      studentID,
      examID
    });
  }

  // 🔴 Delete marks
  deleteMarks(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
