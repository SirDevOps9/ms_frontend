import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UomViewComponent } from './uom-view.component';

describe('UomViewComponent', () => {
  let component: UomViewComponent;
  let fixture: ComponentFixture<UomViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UomViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UomViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
