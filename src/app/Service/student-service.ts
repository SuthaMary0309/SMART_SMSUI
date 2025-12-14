import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditProfileComponent } from '../components/student-dashboard/profile/edit-profile/edit-profile';

@Injectable({
  providedIn: 'root'
  
})
export class StudentService {
  getStudent() {
    throw new Error('Method not implemented.');
  }

 
  private api = "http://localhost:5283/api/student";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.api + "/get-all");
  }

  getById(id: string) {
    return this.http.get(this.api + "/get/" + id);
  }

  add(student: any, profileImage?: File) {
    const formData = new FormData();
    formData.append('studentName', student.studentName);
    formData.append('phoneNo', student.phoneNo);
    formData.append('address', student.address);
    formData.append('email', student.email);
    formData.append('3fa85f64-5717-4562-b3fc-2c963f66afa6', student.classID);
    
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    return this.http.post(this.api + "/add", formData);
  }

  update(id: string, student: any) {
    return this.http.put(this.api + "/update/" + id, student);
  }

  delete(id: string) {
    return this.http.delete(this.api + "/delete/" + id);
  }

  getProfileImage(id: string) {
    return this.http.get<{ imageUrl: string }>(this.api + "/get/" + id + "/profile-image");
  }

  updateProfileImage(id: string, profileImage: File) {
    const formData = new FormData();
    formData.append('profileImage', profileImage);
    return this.http.put(this.api + "/update/" + id + "/profile-image", formData);
  }
}
