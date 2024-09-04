/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditPaymentOutComponent } from './edit-payment-out.component';

describe('EditPaymentOutComponent', () => {
  let component: EditPaymentOutComponent;
  let fixture: ComponentFixture<EditPaymentOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPaymentOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaymentOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
