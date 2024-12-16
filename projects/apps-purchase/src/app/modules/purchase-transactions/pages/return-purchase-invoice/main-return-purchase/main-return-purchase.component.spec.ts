import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainReturnPurchaseComponent } from './main-return-purchase.component';

describe('MainReturnPurchaseComponent', () => {
  let component: MainReturnPurchaseComponent;
  let fixture: ComponentFixture<MainReturnPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainReturnPurchaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainReturnPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
