import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCostCenterComponent } from './edit-cost-center.component';

describe('EditCostCenterComponent', () => {
  let component: EditCostCenterComponent;
  let fixture: ComponentFixture<EditCostCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCostCenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCostCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
