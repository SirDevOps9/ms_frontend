import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFinancialCalendarComponent } from './create-financial-calendar.component';

describe('CreateFinancialCalendarComponent', () => {
  let component: CreateFinancialCalendarComponent;
  let fixture: ComponentFixture<CreateFinancialCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateFinancialCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateFinancialCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
