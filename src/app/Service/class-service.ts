import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private api = "http://localhost:5283/api/class";

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.api + "/get-all");
  }

  add(data: any) {
    return this.http.post(this.api + "/add", {
      className: data.className,
      grade: data.grade
    });
  }

  update(id: string, data: any) {
    return this.http.put(this.api + "/update/" + id, {
      className: data.className,
      grade: data.grade
    });
  }

  delete(id: string) {
    return this.http.delete(this.api + "/delete/" + id);
  }
}
