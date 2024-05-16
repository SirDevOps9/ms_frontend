import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBussinessOwnerComponent } from './edit-bussiness-owner.component';

describe('EditBussinessOwnerComponent', () => {
  let component: EditBussinessOwnerComponent;
  let fixture: ComponentFixture<EditBussinessOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBussinessOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditBussinessOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
