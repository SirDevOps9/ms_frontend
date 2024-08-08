/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MainPaymentTermComponent } from './main-payment-term.component';

describe('MainPaymentTermComponent', () => {
  let component: MainPaymentTermComponent;
  let fixture: ComponentFixture<MainPaymentTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPaymentTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPaymentTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
