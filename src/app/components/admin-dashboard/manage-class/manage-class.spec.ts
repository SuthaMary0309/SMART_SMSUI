import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClass } from './manage-class';

describe('ManageClass', () => {
  let component: ManageClass;
  let fixture: ComponentFixture<ManageClass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageClass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageClass);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
