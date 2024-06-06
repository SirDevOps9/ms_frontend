import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxDefinitionComponent } from './tax-definition.component';

describe('TaxDefinitionComponent', () => {
  let component: TaxDefinitionComponent;
  let fixture: ComponentFixture<TaxDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxDefinitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaxDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
