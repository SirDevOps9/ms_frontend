import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPaymentInComponent } from './main-payment-in.component';

describe('MainPaymentInComponent', () => {
  let component: MainPaymentInComponent;
  let fixture: ComponentFixture<MainPaymentInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPaymentInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainPaymentInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
