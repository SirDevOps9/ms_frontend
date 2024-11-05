import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseAccountEditComponent } from './warehouse-account-edit.component';

describe('WarehouseAccountEditComponent', () => {
  let component: WarehouseAccountEditComponent;
  let fixture: ComponentFixture<WarehouseAccountEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarehouseAccountEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WarehouseAccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
