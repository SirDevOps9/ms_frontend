import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceTrackingComponentComponent } from './sales-invoice-tracking-component.component';

describe('SalesInvoiceTrackingComponentComponent', () => {
  let component: SalesInvoiceTrackingComponentComponent;
  let fixture: ComponentFixture<SalesInvoiceTrackingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesInvoiceTrackingComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesInvoiceTrackingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
