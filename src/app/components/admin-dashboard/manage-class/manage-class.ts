import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ClassService } from '../../../Service/class-service';
import { About } from "../../home/about/about";

@Component({
  selector: 'app-manage-class',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, About],
  templateUrl: './manage-class.html',
  styleUrls: ['./manage-class.css']
})
export class ManageClass implements OnInit {

  classes: any[] = [];

  classData: any = {
    classId: '',
    className: '',
    grade: ''
  };

  constructor(private classService: ClassService) { }

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses() {
    this.classService.getAll().subscribe({
      next: (res: any) => this.classes = res,
      error: err => console.error("Load classes failed", err)
    });
  }

  save() {
    if (this.classData.classId) {
      this.updateClass();
    } else {
      this.addClass();
    }
  }

  addClass() {
    this.classService.add(this.classData).subscribe({
      next: () => {
        alert('Class added!');
        this.resetForm();
        this.loadClasses();
      }
    });
  }

  edit(data: any) {
    this.classData = { ...data };
  }

  updateClass() {
    this.classService.update(this.classData.classId, this.classData).subscribe({
      next: () => {
        alert("Class updated!");
        this.resetForm();
        this.loadClasses();
      }
    });
  }

  delete(id: string) {
    if (confirm("Delete this class?")) {
      this.classService.delete(id).subscribe({
        next: () => {
          alert("Class deleted!");
          this.loadClasses();
        }
      });
    }
  }

  resetForm() {
    this.classData = { classId: '', className: '', grade: '' };
  }
}
