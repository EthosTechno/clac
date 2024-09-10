import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateLifeHistoryComponent } from './corporate-life-history.component';

describe('CorporateLifeHistoryComponent', () => {
  let component: CorporateLifeHistoryComponent;
  let fixture: ComponentFixture<CorporateLifeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateLifeHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateLifeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
