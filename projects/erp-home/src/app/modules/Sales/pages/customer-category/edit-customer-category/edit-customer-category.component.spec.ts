import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerCategoryComponent } from './edit-customer-category.component';

describe('EditCustomerCategoryComponent', () => {
  let component: EditCustomerCategoryComponent;
  let fixture: ComponentFixture<EditCustomerCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCustomerCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCustomerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
