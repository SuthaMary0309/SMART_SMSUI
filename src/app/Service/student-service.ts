import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditProfileComponent } from '../components/student-dashboard/profile/edit-profile/edit-profile';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

 
  private api = "http://localhost:5283/api/student";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.api + "/get-all");
  }

  getById(id: string) {
    return this.http.get(this.api + "/get/" + id);
  }

  add(student: any) {
    return this.http.post(this.api + "/add", student);
  }

  update(id: string, student: any) {
    return this.http.put(this.api + "/update/" + id, student);
  }

  delete(id: string) {
    return this.http.delete(this.api + "/delete/" + id);
  }
}
