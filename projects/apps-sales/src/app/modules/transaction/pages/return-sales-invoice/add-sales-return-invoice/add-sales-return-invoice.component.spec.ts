import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesReturnInvoiceComponent } from './add-sales-return-invoice.component';

describe('AddSalesReturnInvoiceComponent', () => {
  let component: AddSalesReturnInvoiceComponent;
  let fixture: ComponentFixture<AddSalesReturnInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSalesReturnInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSalesReturnInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
