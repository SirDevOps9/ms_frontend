import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItemDefinitionComponent } from './edit-item-definition.component';

describe('EditItemDefinitionComponent', () => {
  let component: EditItemDefinitionComponent;
  let fixture: ComponentFixture<EditItemDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditItemDefinitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditItemDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
