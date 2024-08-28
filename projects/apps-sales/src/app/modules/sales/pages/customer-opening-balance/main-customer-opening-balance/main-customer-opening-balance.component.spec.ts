/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MainCustomerOpeningBalanceComponent } from './main-customer-opening-balance.component';

describe('MainCustomerOpeningBalanceComponent', () => {
  let component: MainCustomerOpeningBalanceComponent;
  let fixture: ComponentFixture<MainCustomerOpeningBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCustomerOpeningBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCustomerOpeningBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
