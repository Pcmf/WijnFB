import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherProductsTeaserComponent } from './other-products-teaser.component';

describe('OtherProductsTeaserComponent', () => {
  let component: OtherProductsTeaserComponent;
  let fixture: ComponentFixture<OtherProductsTeaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherProductsTeaserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherProductsTeaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
