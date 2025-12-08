import { Component, OnInit } from '@angular/core';
import { ParentService } from '../../../Service/parent-service';
import { StudentService } from '../../../Service/student-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-manage-parents',
  templateUrl: './manage-parents.html',
  styleUrls: ['./manage-parents.css'],
  imports: [FormsModule,CommonModule]
})
export class ManageParents implements OnInit {
  parents: any[] = [];
  students: any[] = [];
  parent: any = {
    parentName: '',
    phoneNo: '',
    address: '',
    email: '',
    studentID: ''
  };

  editMode = false;
  editID = '';

  constructor(private parentService: ParentService, private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadParents();
    this.loadStudents();
  }

  loadParents() {
    this.parentService.getAll().subscribe({
      next: (res: any) => this.parents = res,
      error: (err) => {
        console.error('Failed to load parents', err);
        alert('Failed to load parents');
      }
    });
  }

  loadStudents() {
    this.studentService.getAll().subscribe({
      next: (res: any) => this.students = res,
      error: (err) => {
        console.error('Failed to load students', err);
        alert('Failed to load students');
      }
    });
  }

  saveParent() {
    if (!this.parent.parentName || !this.parent.phoneNo || !this.parent.address || !this.parent.email || !this.parent.studentID) {
      alert('Please fill all required fields including selecting a student.');
      return;
    }

    const payload = {
      ParentName: this.parent.parentName,
      PhoneNo: this.parent.phoneNo,
      Address: this.parent.address,
      Email: this.parent.email,
      StudentID: this.parent.studentID
    };

    const req$ = this.editMode ? this.parentService.update(this.editID, payload) : this.parentService.add(payload);

    req$.subscribe({
      next: () => {
        alert(this.editMode ? 'Updated parent' : 'Added parent');
        this.resetForm();
        this.loadParents();
      },
      error: err => {
        console.error('Save parent failed', err);
        if (err.error?.errors) {
          const messages = Object.values(err.error.errors).flat().join('\n');
          alert('Validation errors:\n' + messages);
        } else {
          alert('Error saving parent: ' + (err.error?.message ?? JSON.stringify(err.error)));
        }
      }
    });
  }

  editParent(p: any) {
    this.editMode = true;
    this.editID = p.parentID || p.parentId || '';
    this.parent = {
      parentName: p.parentName,
      phoneNo: p.phoneNo,
      address: p.address,
      email: p.email,
      studentID: p.studentID || p.studentId || ''
    };
  }

  deleteParent(id: string) {
    if (!confirm('Delete parent?')) return;
    this.parentService.delete(id).subscribe({
      next: () => { alert('Deleted'); this.loadParents(); },
      error: (err) => { console.error('Delete failed', err); alert('Failed to delete'); }
    });
  }

  resetForm() {
    this.parent = { parentName: '', phoneNo: '', address: '', email: '', studentID: '' };
    this.editMode = false;
    this.editID = '';
  }
}
