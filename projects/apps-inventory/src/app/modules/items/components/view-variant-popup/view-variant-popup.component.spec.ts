import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVariantPopupComponent } from './view-variant-popup.component';

describe('ViewVariantPopupComponent', () => {
  let component: ViewVariantPopupComponent;
  let fixture: ComponentFixture<ViewVariantPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewVariantPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewVariantPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
