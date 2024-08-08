/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MainCustomerDefintionComponent } from './main-customer-defintion.component';

describe('MainCustomerDefintionComponent', () => {
  let component: MainCustomerDefintionComponent;
  let fixture: ComponentFixture<MainCustomerDefintionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCustomerDefintionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCustomerDefintionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
