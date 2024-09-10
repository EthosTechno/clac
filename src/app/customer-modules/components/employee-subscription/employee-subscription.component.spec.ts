import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSubscriptionComponent } from './employee-subscription.component';

describe('EmployeeSubscriptionComponent', () => {
  let component: EmployeeSubscriptionComponent;
  let fixture: ComponentFixture<EmployeeSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
