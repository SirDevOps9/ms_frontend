import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReturnPurchaseComponent } from './add-return-purchase.component';

describe('AddReturnPurchaseComponent', () => {
  let component: AddReturnPurchaseComponent;
  let fixture: ComponentFixture<AddReturnPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddReturnPurchaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddReturnPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
