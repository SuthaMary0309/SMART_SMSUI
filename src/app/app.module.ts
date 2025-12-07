import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { ManageStudents } from './components/teacher-dashboard/manage-students/manage-students';
import { ManageClass } from './components/admin-dashboard/manage-class/manage-class';
import { ManageSubject } from './components/admin-dashboard/manage-subject/manage-subject';

@NgModule({
    declarations:[],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ManageStudents,
      ManageClass,
      ManageSubject
      
      
    ],
    providers: [],
    

  })
  export class AppModule { }
  