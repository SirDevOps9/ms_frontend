import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVariablesComponent } from './manage-variables.component';

describe('ManageVariablesComponent', () => {
  let component: ManageVariablesComponent;
  let fixture: ComponentFixture<ManageVariablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageVariablesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
