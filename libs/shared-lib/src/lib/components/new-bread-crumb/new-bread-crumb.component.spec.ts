import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBreadCrumbComponent } from './new-bread-crumb.component';

describe('NewBreadCrumbComponent', () => {
  let component: NewBreadCrumbComponent;
  let fixture: ComponentFixture<NewBreadCrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBreadCrumbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewBreadCrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
