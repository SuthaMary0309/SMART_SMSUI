import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private api = "http://localhost:5283/api/exam";

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.api + "/get-all");
  }

  add(data: any) {
    return this.http.post(this.api + "/add", {
      examName: data.examName,
      examDate: data.examDate,
      classId: data.classID,
      subjectId: data.subjectID
    });
  }
  
  update(id: string, data: any) {
    return this.http.put(this.api + `/update/${id}`, {
      examName: data.examName,
      examDate: data.examDate,
      classId: data.classID,
      subjectId: data.subjectID
    });
  }
  

  delete(id: string) {
    return this.http.delete(this.api + "/delete/" + id);
  }
}
