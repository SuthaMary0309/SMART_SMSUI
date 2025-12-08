import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNotification } from './student-notification';

describe('StudentNotification', () => {
  let component: StudentNotification;
  let fixture: ComponentFixture<StudentNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentNotification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentNotification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
