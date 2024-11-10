import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserForActionComponent } from './edit-user-for-action.component';

describe('EditUserForActionComponent', () => {
  let component: EditUserForActionComponent;
  let fixture: ComponentFixture<EditUserForActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserForActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditUserForActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
