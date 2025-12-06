import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMarks } from './manage-marks';

describe('ManageMarks', () => {
  let component: ManageMarks;
  let fixture: ComponentFixture<ManageMarks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageMarks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMarks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
