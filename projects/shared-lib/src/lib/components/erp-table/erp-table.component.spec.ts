import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpTableComponent } from './erp-table.component';

describe('ErpTableComponent', () => {
  let component: ErpTableComponent;
  let fixture: ComponentFixture<ErpTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErpTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
