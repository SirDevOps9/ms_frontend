import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDefinitionInventoryComponent } from './item-definition-inventory.component';

describe('ItemDefinitionInventoryComponent', () => {
  let component: ItemDefinitionInventoryComponent;
  let fixture: ComponentFixture<ItemDefinitionInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemDefinitionInventoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemDefinitionInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
