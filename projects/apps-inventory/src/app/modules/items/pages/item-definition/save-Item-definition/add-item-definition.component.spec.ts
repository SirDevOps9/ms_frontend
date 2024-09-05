import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemDefinitionComponent } from './add-item-definition.component';

describe('AddItemDefinitionComponent', () => {
  let component: AddItemDefinitionComponent;
  let fixture: ComponentFixture<AddItemDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddItemDefinitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddItemDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
