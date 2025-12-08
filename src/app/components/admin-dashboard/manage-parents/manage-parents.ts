import { Component, OnInit } from '@angular/core';
import { ParentService } from '../../../Service/parent-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-manage-parents',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './manage-parents.html',
  styleUrls: ['./manage-parents.css']
})
export class ManageParents implements OnInit {
  parents: any[] = [];
  parent: any = {
    parentName: '',
    phoneNo: '',
    address: '',
    email: '',
    studentID: '',
    userID: ''
  };

  editMode: boolean = false;
  editID: string = '';

  constructor(private parentService: ParentService) { }

  ngOnInit(): void {
    this.loadParents();
  }

  loadParents() {
    this.parentService.getAll().subscribe({
      next: (res: any) => this.parents = res,
      error: (err) => console.error("Failed to load parents", err)
    });
  }

  saveParent() {
    // Validate required fields
    if (!this.parent.parentName || !this.parent.phoneNo || !this.parent.address || !this.parent.email) {
      alert("Please fill all required fields");
      return;
    }

    // Prepare payload with C# DTO property names
    const payload = {
      ParentName: this.parent.parentName,
      PhoneNo: Number(this.parent.phoneNo), // convert string to number
      Address: this.parent.address,
      Email: this.parent.email,
      StudentID: this.parent.studentID && this.parent.studentID !== '' ? this.parent.studentID : null,
      UserID: this.parent.userID && this.parent.userID !== '' 
               ? this.parent.userID 
               : '00000000-0000-0000-0000-000000000000' // default GUID
    };
    

    const request$ = this.editMode
      ? this.parentService.update(this.editID, payload)
      : this.parentService.add(payload);

    request$.subscribe({
      next: () => {
        alert(this.editMode ? "Parent updated successfully!" : "Parent added successfully!");
        this.resetForm();
        this.loadParents();
      },
      error: (err) => {
        console.error("Save parent failed:", err);
        // If backend returns validation errors, display them
        if (err.error && err.error.errors) {
          const messages = Object.values(err.error.errors).flat().join('\n');
          alert("Validation errors:\n" + messages);
        } else {
          alert("Error saving parent");
        }
      }
    });
  }

  editParent(p: any) {
    this.editMode = true;
    this.editID = p.parentID;  // Make sure backend expects ParentID
    this.parent = {
      parentName: p.parentName,
      phoneNo: p.phoneNo,
      address: p.address,
      email: p.email,
      studentID: p.studentID || '',
      userID: p.userID || ''
    };
  }

  deleteParent(id: string) {
    if (confirm("Are you sure to delete this parent?")) {
      this.parentService.delete(id).subscribe({
        next: () => {
          alert("Deleted successfully!");
          this.loadParents();
        },
        error: (err) => {
          console.error("Delete failed", err);
          alert("Failed to delete parent");
        }
      });
    }
  }

  resetForm() {
    this.parent = {
      parentName: '',
      phoneNo: '',
      address: '',
      email: '',
      studentID: '',
      userID: ''
    };
    this.editMode = false;
    this.editID = '';
  }
}
