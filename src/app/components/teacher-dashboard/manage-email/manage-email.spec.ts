import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmail } from './manage-email';

describe('ManageEmail', () => {
  let component: ManageEmail;
  let fixture: ComponentFixture<ManageEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageEmail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
