import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCurrencyConversionComponent } from './add-currency-conversion.component';

describe('AddCurrencyConversionComponent', () => {
  let component: AddCurrencyConversionComponent;
  let fixture: ComponentFixture<AddCurrencyConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCurrencyConversionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCurrencyConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
