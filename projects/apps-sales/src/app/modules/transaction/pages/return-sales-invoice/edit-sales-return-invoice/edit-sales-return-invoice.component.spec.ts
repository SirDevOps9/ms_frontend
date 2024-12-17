import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalesReturnInvoiceComponent } from './edit-sales-return-invoice.component';

describe('EditSalesReturnInvoiceComponent', () => {
  let component: EditSalesReturnInvoiceComponent;
  let fixture: ComponentFixture<EditSalesReturnInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSalesReturnInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSalesReturnInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
