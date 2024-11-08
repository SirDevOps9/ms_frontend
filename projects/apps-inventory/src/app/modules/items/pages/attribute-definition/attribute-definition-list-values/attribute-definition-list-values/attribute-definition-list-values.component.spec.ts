import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeDefinitionListValuesComponent } from './attribute-definition-list-values.component';

describe('AttributeDefinitionListValuesComponent', () => {
  let component: AttributeDefinitionListValuesComponent;
  let fixture: ComponentFixture<AttributeDefinitionListValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttributeDefinitionListValuesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttributeDefinitionListValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
