import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalesReturnInvoiceComponent } from './view-sales-return-invoice.component';

describe('ViewSalesReturnInvoiceComponent', () => {
  let component: ViewSalesReturnInvoiceComponent;
  let fixture: ComponentFixture<ViewSalesReturnInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSalesReturnInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSalesReturnInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
