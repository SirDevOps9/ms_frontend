import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDefinitionUomComponent } from './item-definition-uom.component';

describe('ItemDefinitionUomComponent', () => {
  let component: ItemDefinitionUomComponent;
  let fixture: ComponentFixture<ItemDefinitionUomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemDefinitionUomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemDefinitionUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
