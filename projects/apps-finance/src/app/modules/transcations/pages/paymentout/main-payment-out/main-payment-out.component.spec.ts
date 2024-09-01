/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MainPaymentOutComponent } from './main-payment-out.component';

describe('MainPaymentOutComponent', () => {
  let component: MainPaymentOutComponent;
  let fixture: ComponentFixture<MainPaymentOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPaymentOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPaymentOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
