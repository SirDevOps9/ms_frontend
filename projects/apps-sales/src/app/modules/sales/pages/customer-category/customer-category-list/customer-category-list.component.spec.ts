import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCategoryListComponent } from './customer-category-list.component';

describe('CustomerCategoryListComponent', () => {
  let component: CustomerCategoryListComponent;
  let fixture: ComponentFixture<CustomerCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerCategoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
