import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPurchasingAdvancedSearchComponent } from './vendor-purchasing-advanced-search.component';

describe('VendorPurchasingAdvancedSearchComponent', () => {
  let component: VendorPurchasingAdvancedSearchComponent;
  let fixture: ComponentFixture<VendorPurchasingAdvancedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorPurchasingAdvancedSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorPurchasingAdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
