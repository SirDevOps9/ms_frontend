import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingStockInComponent } from './tracking-stock-in.component';

describe('TrackingStockInComponent', () => {
  let component: TrackingStockInComponent;
  let fixture: ComponentFixture<TrackingStockInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackingStockInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackingStockInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
