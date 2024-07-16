import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCurrencyConversionComponent } from './edit-currency-conversion.component';

describe('EditCurrencyConversionComponent', () => {
  let component: EditCurrencyConversionComponent;
  let fixture: ComponentFixture<EditCurrencyConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCurrencyConversionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCurrencyConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
