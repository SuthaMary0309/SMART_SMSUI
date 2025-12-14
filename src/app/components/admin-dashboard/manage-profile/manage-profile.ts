import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-profile.html',
  styleUrl: './manage-profile.css',
})
export class ManageProfile implements OnInit {
  profile: any = {
    name: '',
    email: '',
    role: '',
    phone: '',
    address: '',
    joinDate: new Date().toLocaleDateString()
  };

  isEditing = false;

  ngOnInit() {
    this.profile.name = localStorage.getItem('name') || localStorage.getItem('username') || 'User';
    this.profile.role = localStorage.getItem('role') || 'Admin';
    this.profile.email = localStorage.getItem('email') || 'admin@edulink.com';
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveProfile() {
    localStorage.setItem('name', this.profile.name);
    this.isEditing = false;
    alert('Profile updated successfully!');
  }
}
