import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAmountEditPopupComponent } from './local-amount-edit-popup.component';

describe('LocalAmountEditPopupComponent', () => {
  let component: LocalAmountEditPopupComponent;
  let fixture: ComponentFixture<LocalAmountEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocalAmountEditPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocalAmountEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
