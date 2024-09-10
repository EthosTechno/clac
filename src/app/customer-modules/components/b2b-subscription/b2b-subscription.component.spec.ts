import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bSubscriptionComponent } from './b2b-subscription.component';

describe('B2bSubscriptionComponent', () => {
  let component: B2bSubscriptionComponent;
  let fixture: ComponentFixture<B2bSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ B2bSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
