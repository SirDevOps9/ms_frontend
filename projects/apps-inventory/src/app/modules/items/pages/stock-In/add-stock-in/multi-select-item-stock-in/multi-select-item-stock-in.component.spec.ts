import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectItemStockInComponent } from './multi-select-item-stock-in.component';

describe('MultiSelectItemStockInComponent', () => {
  let component: MultiSelectItemStockInComponent;
  let fixture: ComponentFixture<MultiSelectItemStockInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiSelectItemStockInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiSelectItemStockInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
