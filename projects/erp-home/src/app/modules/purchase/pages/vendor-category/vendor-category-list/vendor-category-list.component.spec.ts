import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCategoryListComponent } from './vendor-category-list.component';

describe('VendorCategoryListComponent', () => {
  let component: VendorCategoryListComponent;
  let fixture: ComponentFixture<VendorCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorCategoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
