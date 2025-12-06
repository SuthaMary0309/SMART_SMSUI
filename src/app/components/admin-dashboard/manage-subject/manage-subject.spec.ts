import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubject } from './manage-subject';

describe('ManageSubject', () => {
  let component: ManageSubject;
  let fixture: ComponentFixture<ManageSubject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSubject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSubject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
