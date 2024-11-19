import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockOutComponent } from './add-stock-out.component';

describe('AddStockOutComponent', () => {
  let component: AddStockOutComponent;
  let fixture: ComponentFixture<AddStockOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddStockOutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddStockOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
