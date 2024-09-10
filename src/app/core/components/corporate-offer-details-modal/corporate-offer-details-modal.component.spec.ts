import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateOfferDetailsModalComponent } from './corporate-offer-details-modal.component';

describe('CorporateOfferDetailsModalComponent', () => {
  let component: CorporateOfferDetailsModalComponent;
  let fixture: ComponentFixture<CorporateOfferDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateOfferDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateOfferDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
