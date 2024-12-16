import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSalesInvoiceComponent } from './main-sales-invoice.component';

describe('MainSalesInvoiceComponent', () => {
  let component: MainSalesInvoiceComponent;
  let fixture: ComponentFixture<MainSalesInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainSalesInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainSalesInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
