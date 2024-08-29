import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaymentInComponent } from './edit-payment-in.component';

describe('EditPaymentInComponent', () => {
  let component: EditPaymentInComponent;
  let fixture: ComponentFixture<EditPaymentInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPaymentInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPaymentInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
