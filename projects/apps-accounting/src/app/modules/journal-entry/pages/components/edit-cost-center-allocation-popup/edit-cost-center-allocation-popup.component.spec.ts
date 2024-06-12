import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCostCenterAllocationPopupComponent } from './edit-cost-center-allocation-popup.component';

describe('EditCostCenterAllocationPopupComponent', () => {
  let component: EditCostCenterAllocationPopupComponent;
  let fixture: ComponentFixture<EditCostCenterAllocationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCostCenterAllocationPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCostCenterAllocationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
