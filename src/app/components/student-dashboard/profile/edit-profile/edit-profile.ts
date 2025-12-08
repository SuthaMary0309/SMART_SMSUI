import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../../../Service/student-service';

@Component({
  selector: 'app-edit-profile',
  imports:[FormsModule],
  templateUrl: './edit-profile.html',
  styleUrls: ['./edit-profile.css']
})
export class EditProfileComponent implements OnInit {

  student: any;
  studentAvatar: string = "";
  StudentService: any;

  constructor(private router: Router, private studentService: StudentService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  saveChanges() {
    // include avatar in student object
    const updatedStudent = { ...this.student, avatar: this.studentAvatar };
    this.StudentService.updateStudent(updatedStudent);

    alert("Profile updated successfully!");
    this.router.navigate(['/student-profile']);
  }

  goBack() {
    this.router.navigate(['/student-profile']);
  }

  // Optional: change avatar inside edit page
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = () => this.studentAvatar = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }
}
