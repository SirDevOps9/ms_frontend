import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserForActionComponent } from './add-user-for-action.component';

describe('AddUserForActionComponent', () => {
  let component: AddUserForActionComponent;
  let fixture: ComponentFixture<AddUserForActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserForActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUserForActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
