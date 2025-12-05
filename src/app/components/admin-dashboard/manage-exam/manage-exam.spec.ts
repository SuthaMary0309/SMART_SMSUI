import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExam } from './manage-exam';

describe('ManageExam', () => {
  let component: ManageExam;
  let fixture: ComponentFixture<ManageExam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageExam]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageExam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
