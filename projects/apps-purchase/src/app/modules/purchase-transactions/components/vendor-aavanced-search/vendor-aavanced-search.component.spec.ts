import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAavancedSearchComponent } from './vendor-aavanced-search.component';

describe('VendorAavancedSearchComponent', () => {
  let component: VendorAavancedSearchComponent;
  let fixture: ComponentFixture<VendorAavancedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorAavancedSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorAavancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
