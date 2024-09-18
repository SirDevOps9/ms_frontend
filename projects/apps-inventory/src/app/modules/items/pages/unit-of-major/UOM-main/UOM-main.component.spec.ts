/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UOMMainComponent } from './UOM-main.component';

describe('UOMMainComponent', () => {
  let component: UOMMainComponent;
  let fixture: ComponentFixture<UOMMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UOMMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UOMMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
