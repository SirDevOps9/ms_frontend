import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOpeningBalanceNoChildrenComponent } from './customer-opening-balance-no-children.component';

describe('CustomerOpeningBalanceNoChildrenComponent', () => {
  let component: CustomerOpeningBalanceNoChildrenComponent;
  let fixture: ComponentFixture<CustomerOpeningBalanceNoChildrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerOpeningBalanceNoChildrenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerOpeningBalanceNoChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
