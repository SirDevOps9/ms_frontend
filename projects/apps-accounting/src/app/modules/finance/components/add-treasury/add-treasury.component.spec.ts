import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTreasuryComponent } from './add-treasury.component';

describe('AddTreasuryComponent', () => {
  let component: AddTreasuryComponent;
  let fixture: ComponentFixture<AddTreasuryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTreasuryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTreasuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
