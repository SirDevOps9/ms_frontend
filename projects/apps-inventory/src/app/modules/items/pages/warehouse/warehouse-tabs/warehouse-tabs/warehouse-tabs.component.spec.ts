import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseTabsComponent } from './warehouse-tabs.component';

describe('WarehouseTabsComponent', () => {
  let component: WarehouseTabsComponent;
  let fixture: ComponentFixture<WarehouseTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarehouseTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WarehouseTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
