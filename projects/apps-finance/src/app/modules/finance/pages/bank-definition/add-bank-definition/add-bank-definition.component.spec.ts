import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBankDefinitionComponent } from './add-bank-definition.component';

describe('AddBankDefinitionComponent', () => {
  let component: AddBankDefinitionComponent;
  let fixture: ComponentFixture<AddBankDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBankDefinitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBankDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
