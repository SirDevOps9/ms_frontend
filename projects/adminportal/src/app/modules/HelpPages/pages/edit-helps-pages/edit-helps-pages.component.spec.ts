import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHelpsPagesComponent } from './edit-helps-pages.component';

describe('EditHelpsPagesComponent', () => {
  let component: EditHelpsPagesComponent;
  let fixture: ComponentFixture<EditHelpsPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditHelpsPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditHelpsPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
