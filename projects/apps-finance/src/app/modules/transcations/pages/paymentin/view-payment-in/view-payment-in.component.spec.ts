import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaymentInComponent } from './view-payment-in.component';

describe('ViewPaymentInComponent', () => {
  let component: ViewPaymentInComponent;
  let fixture: ComponentFixture<ViewPaymentInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPaymentInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPaymentInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
