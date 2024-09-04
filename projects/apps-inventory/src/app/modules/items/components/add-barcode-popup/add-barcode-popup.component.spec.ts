import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBarcodePopupComponent } from './add-barcode-popup.component';

describe('AddBarcodePopupComponent', () => {
  let component: AddBarcodePopupComponent;
  let fixture: ComponentFixture<AddBarcodePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBarcodePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBarcodePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
