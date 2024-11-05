import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryUomComponent } from './edit-category-uom.component';

describe('EditCategoryUomComponent', () => {
  let component: EditCategoryUomComponent;
  let fixture: ComponentFixture<EditCategoryUomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCategoryUomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCategoryUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
