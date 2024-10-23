import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDefinitionAccountingComponent } from './item-definition-accounting.component';

describe('ItemDefinitionAccountingComponent', () => {
  let component: ItemDefinitionAccountingComponent;
  let fixture: ComponentFixture<ItemDefinitionAccountingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemDefinitionAccountingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemDefinitionAccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
