import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOfAccountTreeComponent } from './chart-of-account-tree.component';

describe('ChartOfAccountTreeComponent', () => {
  let component: ChartOfAccountTreeComponent;
  let fixture: ComponentFixture<ChartOfAccountTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartOfAccountTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartOfAccountTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
