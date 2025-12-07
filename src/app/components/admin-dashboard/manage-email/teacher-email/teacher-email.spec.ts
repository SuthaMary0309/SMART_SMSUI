import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEmail } from './teacher-email';

describe('TeacherEmail', () => {
  let component: TeacherEmail;
  let fixture: ComponentFixture<TeacherEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherEmail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherEmail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
