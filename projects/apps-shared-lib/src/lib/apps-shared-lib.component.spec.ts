import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsSharedLibComponent } from './apps-shared-lib.component';

describe('AppsSharedLibComponent', () => {
  let component: AppsSharedLibComponent;
  let fixture: ComponentFixture<AppsSharedLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppsSharedLibComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppsSharedLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
