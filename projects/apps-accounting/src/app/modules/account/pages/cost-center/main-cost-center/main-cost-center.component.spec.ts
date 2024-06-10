import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCostCenterComponent } from './main-cost-center.component';

describe('MainCostCenterComponent', () => {
  let component: MainCostCenterComponent;
  let fixture: ComponentFixture<MainCostCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainCostCenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainCostCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
