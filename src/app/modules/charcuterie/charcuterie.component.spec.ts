import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharcuterieComponent } from './charcuterie.component';

describe('CharcuterieComponent', () => {
  let component: CharcuterieComponent;
  let fixture: ComponentFixture<CharcuterieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharcuterieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharcuterieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
