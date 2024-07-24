import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOpeningBalanceComponent } from './confirm-opening-balance.component';

describe('ConfirmOpeningBalanceComponent', () => {
  let component: ConfirmOpeningBalanceComponent;
  let fixture: ComponentFixture<ConfirmOpeningBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmOpeningBalanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmOpeningBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
