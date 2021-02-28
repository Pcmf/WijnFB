import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OliveOillComponent } from './olive-oill.component';

describe('OliveOillComponent', () => {
  let component: OliveOillComponent;
  let fixture: ComponentFixture<OliveOillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OliveOillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OliveOillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
