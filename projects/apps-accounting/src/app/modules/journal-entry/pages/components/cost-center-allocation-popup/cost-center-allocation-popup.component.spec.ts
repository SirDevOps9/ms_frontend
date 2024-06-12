import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterAllocationPopupComponent } from './cost-center-allocation-popup.component';

describe('CostCenterAllocationPopupComponent', () => {
  let component: CostCenterAllocationPopupComponent;
  let fixture: ComponentFixture<CostCenterAllocationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CostCenterAllocationPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostCenterAllocationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
