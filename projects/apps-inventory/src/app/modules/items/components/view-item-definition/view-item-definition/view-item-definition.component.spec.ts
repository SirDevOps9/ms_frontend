import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItemDefinitionComponent } from './view-item-definition.component';

describe('ViewItemDefinitionComponent', () => {
  let component: ViewItemDefinitionComponent;
  let fixture: ComponentFixture<ViewItemDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewItemDefinitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewItemDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
