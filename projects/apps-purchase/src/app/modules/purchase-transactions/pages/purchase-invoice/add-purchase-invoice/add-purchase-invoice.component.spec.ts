import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseInvoiceComponent } from './add-purchase-invoice.component';

describe('AddPurchaseInvoiceComponent', () => {
  let component: AddPurchaseInvoiceComponent;
  let fixture: ComponentFixture<AddPurchaseInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPurchaseInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPurchaseInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
