import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSalesReturnInvoiceComponent } from './main-sales-return-invoice.component';

describe('MainSalesReturnInvoiceComponent', () => {
  let component: MainSalesReturnInvoiceComponent;
  let fixture: ComponentFixture<MainSalesReturnInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainSalesReturnInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainSalesReturnInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
