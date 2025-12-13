import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeacherService } from '../../../Service/teacher-service';
import { AppRoutingModule } from "../../../app-routing.module";

@Component({
  selector: 'app-manage-teachers',
  imports: [FormsModule, CommonModule ],
  templateUrl: './manage-teachers.html',
  styleUrl: './manage-teachers.css',
})
export class ManageTeachers implements OnInit {
searchTeachers($event: Event) {
throw new Error('Method not implemented.');
}

  private teacherService = inject(TeacherService);
  teachers: any[] = [];
  teacher: any = {
    teacherName: '',
    phoneNo: '',
    address: '',
    email: '',
    userID: ''
  };

  editMode: boolean = false;
  editID: string = '';
  router: any;

  ngOnInit(): void {
    this.loadTeachers();

    // Dummy UserID for testing
    this.teacher.userID = '11111111-1111-1111-1111-111111111111';
  }

  loadTeachers() {
    this.teacherService.getAll().subscribe((res: any) => {
      this.teachers = res;
    }, err => {
      console.error("Failed to load teachers", err);
    });
  }

  saveTeacher() {
    if (!this.teacher.teacherName || !this.teacher.email || !this.teacher.address || !this.teacher.phoneNo) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      teacherName: this.teacher.teacherName,
      phoneNo: this.teacher.phoneNo,
      address: this.teacher.address,
      email: this.teacher.email,
      userID: this.teacher.userID
    };

    const request$ = this.editMode
      ? this.teacherService.update(this.editID, payload)
      : this.teacherService.add(payload);

    request$.subscribe({
      next: () => {
        alert(this.editMode ? "Teacher updated successfully!" : "Teacher added successfully!");
        this.resetForm();
        this.loadTeachers();
      },
      error: (err: any) => {
        console.error("Save teacher failed:", err);
        alert("Error saving teacher: " + (err.message || "Unknown error"));
      }
    });
  }

  editTeacher(t: any) {
    this.editMode = true;
    this.editID = t.teacherID;

    this.teacher = {
      teacherName: t.teacherName,
      phoneNo: t.phoneNo,
      address: t.address,
      email: t.email,
      userID: t.userID
    };
  }

  deleteTeacher(id: string) {
    if (confirm("Are you sure to delete this teacher?")) {
      this.teacherService.delete(id).subscribe(() => {
        alert("Deleted successfully!");
        this.loadTeachers();
      });
    }
  }

  resetForm() {
    this.teacher = {
      teacherName: '',
      phoneNo: '',
      address: '',
      email: '',
      userID: '11111111-1111-1111-1111-111111111111'
    };
    this.editMode = false;
    this.editID = '';
  }

  goBack() {
    this.router.navigate(['/admin-dashboard']); // 
  }
}