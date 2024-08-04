import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOpeningBalanceDistributeComponent } from './customer-opening-balance-distribute.component';

describe('CustomerOpeningBalanceDistributeComponent', () => {
  let component: CustomerOpeningBalanceDistributeComponent;
  let fixture: ComponentFixture<CustomerOpeningBalanceDistributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerOpeningBalanceDistributeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerOpeningBalanceDistributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
