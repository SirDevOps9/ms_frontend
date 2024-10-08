import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDefinitionBarcodeComponent } from './item-definition-barcode.component';

describe('ItemDefinitionBarcodeComponent', () => {
  let component: ItemDefinitionBarcodeComponent;
  let fixture: ComponentFixture<ItemDefinitionBarcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemDefinitionBarcodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemDefinitionBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
