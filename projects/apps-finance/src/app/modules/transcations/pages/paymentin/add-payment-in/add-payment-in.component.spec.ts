import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentInComponent } from './add-payment-in.component';

describe('AddPaymentInComponent', () => {
  let component: AddPaymentInComponent;
  let fixture: ComponentFixture<AddPaymentInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPaymentInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPaymentInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
