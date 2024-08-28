/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CustomerOpeningBalanceListComponent } from './customer-opening-balance-list.component';

describe('CustomerOpeningBalanceListComponent', () => {
  let component: CustomerOpeningBalanceListComponent;
  let fixture: ComponentFixture<CustomerOpeningBalanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOpeningBalanceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOpeningBalanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
