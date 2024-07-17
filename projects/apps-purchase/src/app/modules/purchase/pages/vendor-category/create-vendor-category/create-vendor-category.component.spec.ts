import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVendorCategoryComponent } from './create-vendor-category.component';

describe('CreateVendorCategoryComponent', () => {
  let component: CreateVendorCategoryComponent;
  let fixture: ComponentFixture<CreateVendorCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateVendorCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateVendorCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
