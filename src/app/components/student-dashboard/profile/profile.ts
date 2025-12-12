import { Component, OnInit, inject } from '@angular/core';
import { StudentService } from '../../../Service/student-service'; // make sure path is correct

@Component({
  selector: 'app-student-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class StudentProfile implements OnInit {
goBack() {
throw new Error('Method not implemented.');
}
editProfile() {
throw new Error('Method not implemented.');
}
onFileSelected($event: Event) {
throw new Error('Method not implemented.');
}

  private studentService = inject(StudentService); // ✅ proper inject
  student: any = {};
studentAvatar: any;

  ngOnInit(): void {
    const studentID = localStorage.getItem("studentID");
    if (!studentID) {
      alert("Student not logged in!");
      return;
    }

    // Call getStudent
    this.studentService.getById(studentID).subscribe({
      next: (res: any) => {
        this.student = res;
      },
      error: (err: any) => {
        console.error("Failed to load student profile", err);
        alert("Failed to load student profile");
      }
    });
  }
}
