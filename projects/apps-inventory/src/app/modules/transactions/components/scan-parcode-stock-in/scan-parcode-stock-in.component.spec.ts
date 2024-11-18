import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanParcodeStockInComponent } from './scan-parcode-stock-in.component';

describe('ScanParcodeStockInComponent', () => {
  let component: ScanParcodeStockInComponent;
  let fixture: ComponentFixture<ScanParcodeStockInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScanParcodeStockInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScanParcodeStockInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
