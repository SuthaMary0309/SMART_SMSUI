import { Injectable } from '@angular/core';
import { EditProfileComponent } from '../components/student-dashboard/profile/edit-profile/edit-profile';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentData = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    phone: "+94 77 123 4567",
    address: "123, Main Street, Colombo",
    school: "ABC International School",
    grade: "10",
    classroom: "A1",
    extra: ""
  };

  private avatar = "https://via.placeholder.com/140";

  constructor() { }

  // Get student info
  getStudent() {
    return { ...this.studentData, avatar: this.avatar };
  }

  // Update student info
  updateStudent(updatedStudent: any, avatar?: string) {
    this.studentData = { ...updatedStudent };
    if (avatar) this.avatar = avatar;
  }
}
