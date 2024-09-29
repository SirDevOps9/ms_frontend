import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttributeDefinitionComponent } from './add-attribute-definition.component';

describe('AddAttributeDefinitionComponent', () => {
  let component: AddAttributeDefinitionComponent;
  let fixture: ComponentFixture<AddAttributeDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAttributeDefinitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAttributeDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
