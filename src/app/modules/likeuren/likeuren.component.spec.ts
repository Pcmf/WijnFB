import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeurenComponent } from './likeuren.component';

describe('LikeurenComponent', () => {
  let component: LikeurenComponent;
  let fixture: ComponentFixture<LikeurenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeurenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeurenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
