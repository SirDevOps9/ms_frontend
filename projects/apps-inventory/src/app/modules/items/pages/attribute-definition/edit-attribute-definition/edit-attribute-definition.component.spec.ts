import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAttributeDefinitionComponent } from './edit-attribute-definition.component';

describe('EditAttributeDefinitionComponent', () => {
  let component: EditAttributeDefinitionComponent;
  let fixture: ComponentFixture<EditAttributeDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAttributeDefinitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAttributeDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
