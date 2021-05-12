import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeConfirmComponent } from './age-confirm.component';

describe('AgeConfirmComponent', () => {
  let component: AgeConfirmComponent;
  let fixture: ComponentFixture<AgeConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgeConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
