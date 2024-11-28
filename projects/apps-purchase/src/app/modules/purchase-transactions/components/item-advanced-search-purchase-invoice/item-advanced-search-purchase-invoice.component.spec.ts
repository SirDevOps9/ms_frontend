import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAdvancedSearchPurchaseInvoiceComponent } from './item-advanced-search-purchase-invoice.component';

describe('ItemAdvancedSearchPurchaseInvoiceComponent', () => {
  let component: ItemAdvancedSearchPurchaseInvoiceComponent;
  let fixture: ComponentFixture<ItemAdvancedSearchPurchaseInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemAdvancedSearchPurchaseInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemAdvancedSearchPurchaseInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
