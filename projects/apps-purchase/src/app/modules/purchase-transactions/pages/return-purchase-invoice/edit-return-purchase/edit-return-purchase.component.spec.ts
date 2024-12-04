import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReturnPurchaseComponent } from './edit-return-purchase.component';

describe('EditReturnPurchaseComponent', () => {
  let component: EditReturnPurchaseComponent;
  let fixture: ComponentFixture<EditReturnPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditReturnPurchaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditReturnPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
