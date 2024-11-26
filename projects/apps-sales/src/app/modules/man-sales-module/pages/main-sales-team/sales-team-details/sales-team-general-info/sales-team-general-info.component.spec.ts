import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTeamGeneralInfoComponent } from './sales-team-general-info.component';

describe('SalesTeamGeneralInfoComponent', () => {
  let component: SalesTeamGeneralInfoComponent;
  let fixture: ComponentFixture<SalesTeamGeneralInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesTeamGeneralInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesTeamGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
