import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnsSelectionComponent } from './columns-selection.component';

describe('ColumnsSelectionComponent', () => {
  let component: ColumnsSelectionComponent;
  let fixture: ComponentFixture<ColumnsSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnsSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColumnsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
