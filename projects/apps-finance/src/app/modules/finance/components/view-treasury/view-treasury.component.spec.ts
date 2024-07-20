import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTreasuryComponent } from './view-treasury.component';

describe('ViewTreasuryComponent', () => {
  let component: ViewTreasuryComponent;
  let fixture: ComponentFixture<ViewTreasuryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTreasuryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTreasuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
