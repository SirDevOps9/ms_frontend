import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesInvoiceComponent } from './add-sales-invoice.component';

describe('AddSalesInvoiceComponent', () => {
  let component: AddSalesInvoiceComponent;
  let fixture: ComponentFixture<AddSalesInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSalesInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSalesInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
