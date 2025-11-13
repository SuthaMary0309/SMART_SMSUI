import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  imports: [RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class StudentProfile {

   studentName = "John Doe";
  studentCourse = "BSc IT";
  studentEmail = "john.doe@gmail.com";
  studentPhone = "+94 77 123 4567";

  constructor(private router: Router) {}
  
 goBack() {
    this.router.navigate(['/student-dashboard']);
}
  
}
