import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxDefinitionEditComponent } from './tax-definition-edit.component';

describe('TaxDefinitionEditComponent', () => {
  let component: TaxDefinitionEditComponent;
  let fixture: ComponentFixture<TaxDefinitionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxDefinitionEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaxDefinitionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
