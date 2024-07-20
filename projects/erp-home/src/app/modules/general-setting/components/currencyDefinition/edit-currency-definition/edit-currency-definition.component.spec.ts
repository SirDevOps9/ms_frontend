import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCurrencyDefinitionComponent } from './edit-currency-definition.component';

describe('EditCurrencyDefinitionComponent', () => {
  let component: EditCurrencyDefinitionComponent;
  let fixture: ComponentFixture<EditCurrencyDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCurrencyDefinitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCurrencyDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
