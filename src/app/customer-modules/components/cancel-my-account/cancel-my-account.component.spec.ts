import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelMyAccountComponent } from './cancel-my-account.component';

describe('CancelMyAccountComponent', () => {
  let component: CancelMyAccountComponent;
  let fixture: ComponentFixture<CancelMyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelMyAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelMyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
