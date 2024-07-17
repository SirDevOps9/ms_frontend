import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVendorCategoryComponent } from './edit-vendor-category.component';

describe('EditVendorCategoryComponent', () => {
  let component: EditVendorCategoryComponent;
  let fixture: ComponentFixture<EditVendorCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditVendorCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditVendorCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
