import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainStockInListComponentComponent } from './main-stock-in-list-component.component';

describe('MainStockInListComponentComponent', () => {
  let component: MainStockInListComponentComponent;
  let fixture: ComponentFixture<MainStockInListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainStockInListComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainStockInListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
