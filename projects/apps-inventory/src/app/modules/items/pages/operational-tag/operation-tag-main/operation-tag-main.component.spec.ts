import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTagMainComponent } from './operation-tag-main.component';

describe('OperationTagMainComponent', () => {
  let component: OperationTagMainComponent;
  let fixture: ComponentFixture<OperationTagMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationTagMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperationTagMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
