/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VendorOpeningBalanceAddComponent } from './vendor-opening-balance-add.component';

describe('VendorOpeningBalanceAddComponent', () => {
  let component: VendorOpeningBalanceAddComponent;
  let fixture: ComponentFixture<VendorOpeningBalanceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorOpeningBalanceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorOpeningBalanceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
