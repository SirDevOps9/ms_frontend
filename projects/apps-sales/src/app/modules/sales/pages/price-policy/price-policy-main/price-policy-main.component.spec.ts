/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PricePolicyMainComponent } from './price-policy-main.component';

describe('PricePolicyMainComponent', () => {
  let component: PricePolicyMainComponent;
  let fixture: ComponentFixture<PricePolicyMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricePolicyMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricePolicyMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
