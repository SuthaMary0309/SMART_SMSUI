import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private api = "https://smartsms.runasp.net/api/teacher";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.api + "/get-all");
  }

  getById(id: string) {
    return this.http.get(this.api + "/get/" + id);
  }

  add(teacher: any) {
    return this.http.post(this.api + "/add", teacher);
  }

  update(id: string, teacher: any) {
    return this.http.put(this.api + "/update/" + id, teacher);
  }

  delete(id: string) {
    return this.http.delete(this.api + "/delete/" + id);
  }
}
