import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTagAddComponent } from './operation-tag-add.component';

describe('OperationTagAddComponent', () => {
  let component: OperationTagAddComponent;
  let fixture: ComponentFixture<OperationTagAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationTagAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperationTagAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
