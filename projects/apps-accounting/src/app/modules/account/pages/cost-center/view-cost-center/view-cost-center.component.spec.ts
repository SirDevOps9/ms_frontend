import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCostCenterComponent } from './view-cost-center.component';

describe('ViewCostCenterComponent', () => {
  let component: ViewCostCenterComponent;
  let fixture: ComponentFixture<ViewCostCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCostCenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewCostCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
