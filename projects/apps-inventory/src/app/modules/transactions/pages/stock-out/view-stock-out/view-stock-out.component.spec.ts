import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStockOutComponent } from './view-stock-out.component';

describe('ViewStockOutComponent', () => {
  let component: ViewStockOutComponent;
  let fixture: ComponentFixture<ViewStockOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewStockOutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewStockOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
