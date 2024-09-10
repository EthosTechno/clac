import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelMySubscriptionComponent } from './cancel-my-subscription.component';

describe('CancelMySubscriptionComponent', () => {
  let component: CancelMySubscriptionComponent;
  let fixture: ComponentFixture<CancelMySubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelMySubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelMySubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
