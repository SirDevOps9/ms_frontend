import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainStockOutComponent } from './main-stock-out.component';

describe('MainStockOutComponent', () => {
  let component: MainStockOutComponent;
  let fixture: ComponentFixture<MainStockOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainStockOutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainStockOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
