import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInListComponent } from './payment-in-list.component';

describe('PaymentInListComponent', () => {
  let component: PaymentInListComponent;
  let fixture: ComponentFixture<PaymentInListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentInListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
