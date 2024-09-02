import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCostcenterComponent } from './popup-costcenter.component';

describe('PopupCostcenterComponent', () => {
  let component: PopupCostcenterComponent;
  let fixture: ComponentFixture<PopupCostcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupCostcenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupCostcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
