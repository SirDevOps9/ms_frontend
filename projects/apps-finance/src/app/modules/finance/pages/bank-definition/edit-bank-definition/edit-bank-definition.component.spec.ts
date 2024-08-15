import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBankDefinitionComponent } from './edit-bank-definition.component';

describe('EditBankDefinitionComponent', () => {
  let component: EditBankDefinitionComponent;
  let fixture: ComponentFixture<EditBankDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBankDefinitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditBankDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
