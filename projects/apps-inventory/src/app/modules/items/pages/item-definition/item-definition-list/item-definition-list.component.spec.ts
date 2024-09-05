import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDefinitionListComponent } from './item-definition-list.component';

describe('ItemDefinitionListComponent', () => {
  let component: ItemDefinitionListComponent;
  let fixture: ComponentFixture<ItemDefinitionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemDefinitionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemDefinitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
