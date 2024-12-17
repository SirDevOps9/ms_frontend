import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupExcelComponent } from './popup-excel.component';

describe('PopupExcelComponent', () => {
  let component: PopupExcelComponent;
  let fixture: ComponentFixture<PopupExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupExcelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
