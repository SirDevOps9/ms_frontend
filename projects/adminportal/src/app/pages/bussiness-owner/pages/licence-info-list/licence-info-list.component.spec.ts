import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceInfoListComponent } from './licence-info-list.component';

describe('LicenceInfoListComponent', () => {
  let component: LicenceInfoListComponent;
  let fixture: ComponentFixture<LicenceInfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LicenceInfoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LicenceInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
