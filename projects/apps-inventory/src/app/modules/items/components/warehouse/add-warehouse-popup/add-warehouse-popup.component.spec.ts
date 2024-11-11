import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWarehousePopupComponent } from './add-warehouse-popup.component';

describe('AddWarehousePopupComponent', () => {
  let component: AddWarehousePopupComponent;
  let fixture: ComponentFixture<AddWarehousePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddWarehousePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWarehousePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
