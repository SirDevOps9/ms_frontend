import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBussinessOwnerComponent } from './add-bussiness-owner.component';

describe('AddBussinessOwnerComponent', () => {
  let component: AddBussinessOwnerComponent;
  let fixture: ComponentFixture<AddBussinessOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBussinessOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBussinessOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
