import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManPopupComponent } from './add-man-popup.component';

describe('AddManPopupComponent', () => {
  let component: AddManPopupComponent;
  let fixture: ComponentFixture<AddManPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddManPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddManPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
