import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSettingInvComponent } from './general-setting-inv.component';

describe('GeneralSettingInvComponent', () => {
  let component: GeneralSettingInvComponent;
  let fixture: ComponentFixture<GeneralSettingInvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralSettingInvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralSettingInvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
