import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAdvancedSearchSalesInvoiceComponentComponent } from './item-advanced-search-sales-invoice-component.component';

describe('ItemAdvancedSearchSalesInvoiceComponentComponent', () => {
  let component: ItemAdvancedSearchSalesInvoiceComponentComponent;
  let fixture: ComponentFixture<ItemAdvancedSearchSalesInvoiceComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemAdvancedSearchSalesInvoiceComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemAdvancedSearchSalesInvoiceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
