/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { bouserdetails } from './bouserdetails.component';

describe('bouserdetails', () => {
  let component: bouserdetails;
  let fixture: ComponentFixture<bouserdetails>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ bouserdetails ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(bouserdetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
