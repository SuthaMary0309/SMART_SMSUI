import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ExamDTO {
  examID?: string;   // optional for new exams
  classID: string;
  subjectID: string;
  examName: string;
  examDate: string; // ISO string
}

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private api = "http://localhost:5283/api/exam";

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.api + "/get-all");
  }

  getById(id: string) {
    return this.http.get(`${this.api}/get/${id}`);
  }

  add(exam: ExamDTO) {
    return this.http.post(this.api + "/add", exam);
  }

  update(id: string, exam: ExamDTO) {
    return this.http.put(`${this.api}/update/${id}`, exam);
  }

  delete(id: string) {
    return this.http.delete(`${this.api}/delete/${id}`);
  }
}
