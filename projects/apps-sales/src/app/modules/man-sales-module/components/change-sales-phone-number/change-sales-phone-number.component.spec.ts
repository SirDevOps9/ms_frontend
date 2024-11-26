import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSalesPhoneNumberComponent } from './change-sales-phone-number.component';

describe('ChangeSalesPhoneNumberComponent', () => {
  let component: ChangeSalesPhoneNumberComponent;
  let fixture: ComponentFixture<ChangeSalesPhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeSalesPhoneNumberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeSalesPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
