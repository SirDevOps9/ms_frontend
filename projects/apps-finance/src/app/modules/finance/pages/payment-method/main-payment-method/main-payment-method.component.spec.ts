import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPaymentMethodComponent } from './main-payment-method.component';

describe('MainPaymentMethodComponent', () => {
  let component: MainPaymentMethodComponent;
  let fixture: ComponentFixture<MainPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPaymentMethodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
