import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerOpeeningBalanceComponent } from './add-customer-opeening-balance.component';

describe('AddCustomerOpeeningBalanceComponent', () => {
  let component: AddCustomerOpeeningBalanceComponent;
  let fixture: ComponentFixture<AddCustomerOpeeningBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCustomerOpeeningBalanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCustomerOpeeningBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
