import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCurrencyDefinitionComponent } from './add-currency-definition.component';

describe('AddCurrencyDefinitionComponent', () => {
  let component: AddCurrencyDefinitionComponent;
  let fixture: ComponentFixture<AddCurrencyDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCurrencyDefinitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCurrencyDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
