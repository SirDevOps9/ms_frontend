import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainWarehouseComponent } from './main-warehouse.component';

describe('MainWarehouseComponent', () => {
  let component: MainWarehouseComponent;
  let fixture: ComponentFixture<MainWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainWarehouseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
