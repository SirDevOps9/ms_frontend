import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWarehouseComponent } from './view-warehouse.component';

describe('ViewWarehouseComponent', () => {
  let component: ViewWarehouseComponent;
  let fixture: ComponentFixture<ViewWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewWarehouseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
