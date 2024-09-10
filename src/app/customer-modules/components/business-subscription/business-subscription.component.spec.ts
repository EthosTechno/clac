import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSubscriptionComponent } from './business-subscription.component';

describe('BusinessSubscriptionComponent', () => {
  let component: BusinessSubscriptionComponent;
  let fixture: ComponentFixture<BusinessSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
