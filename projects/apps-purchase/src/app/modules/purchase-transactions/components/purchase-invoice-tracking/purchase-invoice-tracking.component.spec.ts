import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInvoiceTrackingComponent } from './purchase-invoice-tracking.component';

describe('PurchaseInvoiceTrackingComponent', () => {
  let component: PurchaseInvoiceTrackingComponent;
  let fixture: ComponentFixture<PurchaseInvoiceTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseInvoiceTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseInvoiceTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
