import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEmail } from './student-email';

describe('StudentEmail', () => {
  let component: StudentEmail;
  let fixture: ComponentFixture<StudentEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentEmail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentEmail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
