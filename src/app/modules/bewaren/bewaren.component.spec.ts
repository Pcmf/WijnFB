import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BewarenComponent } from './bewaren.component';

describe('BewarenComponent', () => {
  let component: BewarenComponent;
  let fixture: ComponentFixture<BewarenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BewarenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BewarenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
