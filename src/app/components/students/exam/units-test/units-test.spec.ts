import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsTest } from './units-test';

describe('UnitsTest', () => {
  let component: UnitsTest;
  let fixture: ComponentFixture<UnitsTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitsTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitsTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
