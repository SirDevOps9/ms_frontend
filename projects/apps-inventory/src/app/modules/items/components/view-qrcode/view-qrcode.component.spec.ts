import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQRcodeComponent } from './view-qrcode.component';

describe('ViewQRcodeComponent', () => {
  let component: ViewQRcodeComponent;
  let fixture: ComponentFixture<ViewQRcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewQRcodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewQRcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
