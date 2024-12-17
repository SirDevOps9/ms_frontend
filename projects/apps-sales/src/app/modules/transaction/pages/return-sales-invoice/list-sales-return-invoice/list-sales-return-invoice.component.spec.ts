import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalesReturnInvoiceComponent } from './list-sales-return-invoice.component';

describe('ListSalesReturnInvoiceComponent', () => {
  let component: ListSalesReturnInvoiceComponent;
  let fixture: ComponentFixture<ListSalesReturnInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSalesReturnInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListSalesReturnInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
