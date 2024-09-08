import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxDefinitionAddComponent } from './tax-definition-add.component';

describe('TaxDefinitionAddComponent', () => {
  let component: TaxDefinitionAddComponent;
  let fixture: ComponentFixture<TaxDefinitionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxDefinitionAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaxDefinitionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
