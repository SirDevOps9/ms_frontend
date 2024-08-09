import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorOpeningBalanceComponent } from './vendor-opening-balance.component';

describe('VendorOpeningBalanceComponent', () => {
  let component: VendorOpeningBalanceComponent;
  let fixture: ComponentFixture<VendorOpeningBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorOpeningBalanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorOpeningBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
