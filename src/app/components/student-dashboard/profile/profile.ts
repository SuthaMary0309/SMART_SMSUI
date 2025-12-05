import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  standalone: true,
  imports: [FormsModule, ]
})
export class StudentProfile {
  studetntService: any;
  studentService: any;
saveChanges() {
throw new Error('Method not implemented.');
}

  @ViewChild('fileInput') fileInput!: ElementRef;

  studentAvatar = "https://via.placeholder.com/140";

  student = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    phone: "+94 77 123 4567",
    address: "123, Main Street, Colombo",
    school: "ABC International School",
    grade: "10",
    classroom: "A1",
    extra: ""
  };

  constructor(private router: Router) {}

  ngOnInit() {
    const data = this.studentService.getStudent();
    this.student = data;
    this.studentAvatar = data.avatar;
  }

  // Open file manager / phone gallery
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  // When a profile image is selected
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.studentAvatar = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Back button
  goBack() {
    this.router.navigate(['/student-dashboard']);
  }

  // Navigate to edit page
  editProfile() {
    this.router.navigate(['/edit-profile']);
  }

  // Delete profile data
  deleteProfile() {
    if (confirm("Are you sure you want to delete this profile?")) {
      alert("Profile deleted!");
    }
  }

  
 
}
