import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterReportComponent } from './cost-center-report.component';

describe('CostCenterReportComponent', () => {
  let component: CostCenterReportComponent;
  let fixture: ComponentFixture<CostCenterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CostCenterReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostCenterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
