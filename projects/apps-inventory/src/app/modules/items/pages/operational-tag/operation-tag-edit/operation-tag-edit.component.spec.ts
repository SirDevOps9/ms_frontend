import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTagEditComponent } from './operation-tag-edit.component';

describe('OperationTagEditComponent', () => {
  let component: OperationTagEditComponent;
  let fixture: ComponentFixture<OperationTagEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationTagEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperationTagEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
