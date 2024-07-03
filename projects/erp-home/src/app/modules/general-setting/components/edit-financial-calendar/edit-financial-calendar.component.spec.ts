import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFinancialCalendarComponent } from './edit-financial-calendar.component';

describe('EditFinancialCalendarComponent', () => {
  let component: EditFinancialCalendarComponent;
  let fixture: ComponentFixture<EditFinancialCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFinancialCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFinancialCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
