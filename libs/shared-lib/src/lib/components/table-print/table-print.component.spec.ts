import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePrintComponent } from './table-print.component';

describe('TablePrintComponent', () => {
  let component: TablePrintComponent;
  let fixture: ComponentFixture<TablePrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePrintComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
