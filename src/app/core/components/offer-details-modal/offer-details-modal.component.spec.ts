import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDetailsModalComponent } from './offer-details-modal.component';

describe('OfferDetailsModalComponent', () => {
  let component: OfferDetailsModalComponent;
  let fixture: ComponentFixture<OfferDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
