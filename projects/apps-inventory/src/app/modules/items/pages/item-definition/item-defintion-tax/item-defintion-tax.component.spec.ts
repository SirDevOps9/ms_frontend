import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDefintionTaxComponent } from './item-defintion-tax.component';

describe('ItemDefintionTaxComponent', () => {
  let component: ItemDefintionTaxComponent;
  let fixture: ComponentFixture<ItemDefintionTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemDefintionTaxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemDefintionTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
