import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private api = "http://localhost:5283/api/parent";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.api + "/get-all");
  }

  getById(id: string) {
    return this.http.get(this.api + "/get/" + id);
  }

  add(parent: any) {
    return this.http.post(this.api + "/add", parent);
  }

  update(id: string, parent: any) {
    return this.http.put(this.api + "/update/" + id, parent);
  }

  delete(id: string) {
    return this.http.delete(this.api + "/delete/" + id);
  }
}
