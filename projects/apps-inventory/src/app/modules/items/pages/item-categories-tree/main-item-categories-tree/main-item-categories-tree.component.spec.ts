import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainItemCategoriesTreeComponent } from './main-item-categories-tree.component';

describe('MainItemCategoriesTreeComponent', () => {
  let component: MainItemCategoriesTreeComponent;
  let fixture: ComponentFixture<MainItemCategoriesTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainItemCategoriesTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainItemCategoriesTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
