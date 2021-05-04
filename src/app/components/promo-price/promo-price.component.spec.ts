import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoPriceComponent } from './promo-price.component';

describe('PromoPriceComponent', () => {
  let component: PromoPriceComponent;
  let fixture: ComponentFixture<PromoPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
