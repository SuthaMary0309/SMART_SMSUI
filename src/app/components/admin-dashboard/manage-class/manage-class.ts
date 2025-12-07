import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ClassService } from '../../../Service/class-service';

@Component({
  selector: 'app-manage-class',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './manage-class.html',
  styleUrls: ['./manage-class.css']
})
export class ManageClass implements OnInit {

  classes: any[] = [];

  classData: any = {
    classID: undefined,
    className: '',
    grade: ''
  };

  constructor(private classService: ClassService) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses() {
    this.classService.getAll().subscribe({
      next: (res: any) => this.classes = res,
      error: (err) => console.error("Load classes failed", err)
    });
  }

  save() {
    if (this.classData.classID) {
      this.updateClass();
    } else {
      this.addClass();
    }
  }

  addClass() {
    this.classService.add(this.classData).subscribe({
      next: () => {
        alert("Class added successfully!");
        this.loadClasses();
        this.resetForm();
      },
      error: (err) => console.error("Add failed", err)
    });
  }

  edit(data: any) {
    this.classData = { ...data }; // include classID
  }

  updateClass() {
    this.classService.update(this.classData.classID, this.classData).subscribe({
      next: () => {
        alert("Class updated successfully!");
        this.loadClasses();
        this.resetForm();
      },
      error: (err) => console.error("Update failed", err)
    });
  }

  delete(id: string) {
    if (confirm("Are you sure you want to delete this class?")) {
      this.classService.delete(id).subscribe({
        next: () => {
          alert("Class deleted successfully!");
          this.loadClasses();
        },
        error: (err) => console.error("Delete failed", err)
      });
    }
  }

  resetForm() {
    this.classData = {
      classID: undefined,
      className: '',
      grade: ''
    };
  }
}
