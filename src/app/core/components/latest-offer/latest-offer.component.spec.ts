import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestOfferComponent } from './latest-offer.component';

describe('LatestOfferComponent', () => {
  let component: LatestOfferComponent;
  let fixture: ComponentFixture<LatestOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
