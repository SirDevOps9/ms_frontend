import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDefinitionGeneralComponent } from './item-definition-general.component';

describe('ItemDefinitionGeneralComponent', () => {
  let component: ItemDefinitionGeneralComponent;
  let fixture: ComponentFixture<ItemDefinitionGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemDefinitionGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemDefinitionGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
