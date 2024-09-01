/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddPaymentOutComponent } from './add-payment-out.component';

describe('AddPaymentOutComponent', () => {
  let component: AddPaymentOutComponent;
  let fixture: ComponentFixture<AddPaymentOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPaymentOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaymentOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
