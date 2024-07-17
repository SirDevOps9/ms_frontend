import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTreasuryComponent } from './edit-treasury.component';

describe('EditTreasuryComponent', () => {
  let component: EditTreasuryComponent;
  let fixture: ComponentFixture<EditTreasuryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTreasuryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTreasuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
