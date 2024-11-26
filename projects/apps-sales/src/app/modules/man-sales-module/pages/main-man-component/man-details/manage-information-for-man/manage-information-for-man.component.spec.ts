import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInformationForManComponent } from './manage-information-for-man.component';

describe('ManageInformationForManComponent', () => {
  let component: ManageInformationForManComponent;
  let fixture: ComponentFixture<ManageInformationForManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageInformationForManComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageInformationForManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
