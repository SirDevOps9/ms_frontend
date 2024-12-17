import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAmountPopupComponent } from './local-amount-popup.component';

describe('LocalAmountPopupComponent', () => {
  let component: LocalAmountPopupComponent;
  let fixture: ComponentFixture<LocalAmountPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocalAmountPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocalAmountPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
