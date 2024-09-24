import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsCategoryTreeComponent } from './items-category-tree.component';

describe('ItemsCategoryTreeComponent', () => {
  let component: ItemsCategoryTreeComponent;
  let fixture: ComponentFixture<ItemsCategoryTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemsCategoryTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemsCategoryTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
