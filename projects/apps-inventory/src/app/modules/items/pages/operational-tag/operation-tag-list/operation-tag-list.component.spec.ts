import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTagListComponent } from './operation-tag-list.component';

describe('OperationTagListComponent', () => {
  let component: OperationTagListComponent;
  let fixture: ComponentFixture<OperationTagListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationTagListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperationTagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
