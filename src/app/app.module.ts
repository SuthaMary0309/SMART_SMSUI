import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { ManageStudents } from './components/teacher-dashboard/manage-students/manage-students';
import { ManageClass } from './components/admin-dashboard/manage-class/manage-class';
import { ManageSubject } from './components/admin-dashboard/manage-subject/manage-subject';
import { ManageEmail } from './components/teacher-dashboard/manage-email/manage-email';
import { ManageMarks } from './components/admin-dashboard/manage-marks/manage-marks';
import { ManageExam } from './components/admin-dashboard/manage-exam/manage-exam';
import { ManageReports } from './components/admin-dashboard/manage-reports/manage-reports';
import { ManageAttendance } from './components/admin-dashboard/manage-attendance/manage-attendance';
import { ManageParent } from './components/teacher-dashboard/manage-parent/manage-parent';

@NgModule({
    declarations:[],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ManageStudents,
      ManageClass,
      ManageEmail,
      ManageMarks,
      ManageExam,
      ManageSubject,
      ManageReports,
      ManageAttendance,
      ManageParent
      
      
    ],
    providers: [],
    

  })
  export class AppModule { }
  