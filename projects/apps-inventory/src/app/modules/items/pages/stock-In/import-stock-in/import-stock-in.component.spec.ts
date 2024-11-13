import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportStockInComponent } from './import-stock-in.component';

describe('ImportStockInComponent', () => {
  let component: ImportStockInComponent;
  let fixture: ComponentFixture<ImportStockInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportStockInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportStockInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
