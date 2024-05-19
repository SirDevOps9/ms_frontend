import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInfoListComponent } from './app-info-list.component';

describe('AppInfoListComponent', () => {
  let component: AppInfoListComponent;
  let fixture: ComponentFixture<AppInfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppInfoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
