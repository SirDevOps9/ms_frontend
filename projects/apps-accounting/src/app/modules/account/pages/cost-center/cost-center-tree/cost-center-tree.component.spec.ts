import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterTreeComponent } from './cost-center-tree.component';

describe('CostCenterTreeComponent', () => {
  let component: CostCenterTreeComponent;
  let fixture: ComponentFixture<CostCenterTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CostCenterTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostCenterTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
