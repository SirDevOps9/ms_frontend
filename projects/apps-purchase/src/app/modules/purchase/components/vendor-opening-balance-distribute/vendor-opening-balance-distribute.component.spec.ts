/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VendorOpeningBalanceDistributeComponent } from './vendor-opening-balance-distribute.component';

describe('VendorOpeningBalanceDistributeComponent', () => {
  let component: VendorOpeningBalanceDistributeComponent;
  let fixture: ComponentFixture<VendorOpeningBalanceDistributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorOpeningBalanceDistributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorOpeningBalanceDistributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
