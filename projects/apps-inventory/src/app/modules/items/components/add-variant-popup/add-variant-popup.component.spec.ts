import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVariantPopupComponent } from './add-variant-popup.component';

describe('AddVariantPopupComponent', () => {
  let component: AddVariantPopupComponent;
  let fixture: ComponentFixture<AddVariantPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddVariantPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddVariantPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
