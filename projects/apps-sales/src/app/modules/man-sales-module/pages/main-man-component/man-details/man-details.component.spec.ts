import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManDetailsComponent } from './man-details.component';

describe('ManDetailsComponent', () => {
  let component: ManDetailsComponent;
  let fixture: ComponentFixture<ManDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
