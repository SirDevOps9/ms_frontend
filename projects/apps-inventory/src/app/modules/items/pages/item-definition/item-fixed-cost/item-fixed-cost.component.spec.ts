import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFixedCostComponent } from './item-fixed-cost.component';

describe('ItemFixedCostComponent', () => {
  let component: ItemFixedCostComponent;
  let fixture: ComponentFixture<ItemFixedCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemFixedCostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemFixedCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
