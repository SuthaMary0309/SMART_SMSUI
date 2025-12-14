import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

// Components
import { ManageStudents } from './components/teacher-dashboard/manage-students/manage-students';
import { ManageClass } from './components/admin-dashboard/manage-class/manage-class';
import { ManageSubject } from './components/admin-dashboard/manage-subject/manage-subject';
import { ManageEmail } from './components/teacher-dashboard/manage-email/manage-email';
import { ManageMarks } from './components/admin-dashboard/manage-marks/manage-marks';
import { ManageExam } from './components/admin-dashboard/manage-exam/manage-exam';
import { ManageAttendance } from './components/admin-dashboard/manage-attendance/manage-attendance';
import { ManageParent } from './components/teacher-dashboard/manage-parent/manage-parent';

// Services
import { TokenInterceptor } from './interceptors/token-interceptor';

@NgModule({
  declarations: [],
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
    ManageAttendance,
    ManageParent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: []
})
export class AppModule { }
