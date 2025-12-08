import { Component } from '@angular/core';
import {  RouterLink } from "@angular/router";


@Component({
  selector: 'app-admin-dashboard',
  imports: [ RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  name = "";

  ngOnInit() {
    this.name = localStorage.getItem("name") ?? "";
  }


  Routerlink: any;
  goBack() {
    this.Routerlink.navigate(['/login']);
}
}
