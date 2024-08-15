import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDefinitionListComponent } from './bank-definition-list.component';

describe('BankDefinitionListComponent', () => {
  let component: BankDefinitionListComponent;
  let fixture: ComponentFixture<BankDefinitionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BankDefinitionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankDefinitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
