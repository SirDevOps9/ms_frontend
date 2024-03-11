/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ERPUserComponent } from './erp-users.component';

describe('ERPUserComponent', () => {
  let component: ERPUserComponent;
  let fixture: ComponentFixture<ERPUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ERPUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ERPUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
