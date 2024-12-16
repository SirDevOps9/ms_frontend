import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCMSComponent } from './edit-cms.component';

describe('EditCMSComponent', () => {
  let component: EditCMSComponent;
  let fixture: ComponentFixture<EditCMSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCMSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
