import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeDefinitionValuesComponent } from './attribute-definition-values.component';

describe('AttributeDefinitionValuesComponent', () => {
  let component: AttributeDefinitionValuesComponent;
  let fixture: ComponentFixture<AttributeDefinitionValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttributeDefinitionValuesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttributeDefinitionValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
