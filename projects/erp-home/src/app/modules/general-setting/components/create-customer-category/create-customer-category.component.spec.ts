import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerCategoryComponent } from './create-customer-category.component';

describe('CreateCustomerCategoryComponent', () => {
  let component: CreateCustomerCategoryComponent;
  let fixture: ComponentFixture<CreateCustomerCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCustomerCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCustomerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
