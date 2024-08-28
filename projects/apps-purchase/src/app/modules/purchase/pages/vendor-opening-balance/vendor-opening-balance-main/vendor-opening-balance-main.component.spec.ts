/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VendorOpeningBalanceMainComponent } from './vendor-opening-balance-main.component';

describe('VendorOpeningBalanceMainComponent', () => {
  let component: VendorOpeningBalanceMainComponent;
  let fixture: ComponentFixture<VendorOpeningBalanceMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorOpeningBalanceMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorOpeningBalanceMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
