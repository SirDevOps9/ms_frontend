import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPurchaseInvoiceComponent } from './main-purchase-invoice.component';

describe('MainPurchaseInvoiceComponent', () => {
  let component: MainPurchaseInvoiceComponent;
  let fixture: ComponentFixture<MainPurchaseInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPurchaseInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainPurchaseInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
