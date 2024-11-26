import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMenInTeamComponent } from './view-men-in-team.component';

describe('ViewMenInTeamComponent', () => {
  let component: ViewMenInTeamComponent;
  let fixture: ComponentFixture<ViewMenInTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewMenInTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewMenInTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
