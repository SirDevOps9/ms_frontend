import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialCalendarListComponent } from './financial-calendar-list.component';

describe('FinancialCalendarListComponent', () => {
  let component: FinancialCalendarListComponent;
  let fixture: ComponentFixture<FinancialCalendarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialCalendarListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialCalendarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
