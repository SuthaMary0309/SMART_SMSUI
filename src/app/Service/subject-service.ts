import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private api = "https://smartsms.runasp.net/api/subject";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.api + "/get-all");
  }

  getById(id: string) {
    return this.http.get(this.api + "/get/" + id);
  }

  add(subject: any) {
    return this.http.post(this.api + "/add", subject);
  }

  update(id: string, subject: any) {
    return this.http.put(this.api + "/update/" + id, subject);
  }

  delete(id: string) {
    return this.http.delete(this.api + "/delete/" + id);
  }

}
