import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHelpPageComponent } from './add-help-page.component';

describe('AddHelpPageComponent', () => {
  let component: AddHelpPageComponent;
  let fixture: ComponentFixture<AddHelpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddHelpPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddHelpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
