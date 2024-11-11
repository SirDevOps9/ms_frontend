import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDefintionVatComponent } from './item-defintion-vat.component';

describe('ItemDefintionVatComponent', () => {
  let component: ItemDefintionVatComponent;
  let fixture: ComponentFixture<ItemDefintionVatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemDefintionVatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemDefintionVatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
