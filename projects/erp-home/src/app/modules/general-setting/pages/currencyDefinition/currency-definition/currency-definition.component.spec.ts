import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyDefinitionComponent } from './currency-definition.component';

describe('CurrencyDefinitionComponent', () => {
  let component: CurrencyDefinitionComponent;
  let fixture: ComponentFixture<CurrencyDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyDefinitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrencyDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
