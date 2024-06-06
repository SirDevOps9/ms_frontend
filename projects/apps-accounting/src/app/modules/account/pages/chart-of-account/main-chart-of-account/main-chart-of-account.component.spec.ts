import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainChartOfAccountComponent } from './main-chart-of-account.component';

describe('MainChartOfAccountComponent', () => {
  let component: MainChartOfAccountComponent;
  let fixture: ComponentFixture<MainChartOfAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainChartOfAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainChartOfAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
