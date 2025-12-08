import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MarksService } from '../../../Service/marks-service';

@Component({
  selector: 'app-manage-marks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-marks.html',
  styleUrls: ['./manage-marks.css']
})
export class ManageMarks implements OnInit {

  marksList: any[] = [];

  marksId = '';
  grade = 0;
  mark = 0;
  studentID = '';
  examID = '';

  isEditMode = false;

  constructor(private marksService: MarksService) {}

  ngOnInit(): void {
    this.getAllMarks();
  }

  getAllMarks() {
    this.marksService.getAllMarks().subscribe(res => {
      this.marksList = res;
    });
  }

  addMarks() {
    this.marksService.addMarks(this.grade, this.mark, this.studentID, this.examID)
      .subscribe(() => {
        alert("Marks Added!");
        this.resetForm();
        this.getAllMarks();
      });
  }

  editMarks(m: any) {
    this.isEditMode = true;
    this.marksId = m.marksId;
    this.grade = m.grade;
    this.mark = m.mark;
    this.studentID = m.studentID;
    this.examID = m.examID;
  }

  updateMarks() {
    this.marksService.updateMarks(this.marksId, this.grade, this.mark, this.studentID, this.examID)
      .subscribe(() => {
        alert("Marks Updated!");
        this.resetForm();
        this.getAllMarks();
        this.isEditMode = false;
      });
  }

  deleteMarks(id: string) {
    if (!confirm("Delete this?")) return;

    this.marksService.deleteMarks(id).subscribe(() => {
      alert("Deleted!");
      this.getAllMarks();
    });
  }

  resetForm() {
    this.grade = 0;
    this.mark = 0;
    this.studentID = '';
    this.examID = '';
    this.marksId = '';
    this.isEditMode = false;
  }
}
