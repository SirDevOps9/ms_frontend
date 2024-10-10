import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDefinitionAttributesVariantsComponent } from './item-definition-attributes-variants.component';

describe('ItemDefinitionAttributesVariantsComponent', () => {
  let component: ItemDefinitionAttributesVariantsComponent;
  let fixture: ComponentFixture<ItemDefinitionAttributesVariantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemDefinitionAttributesVariantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemDefinitionAttributesVariantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
