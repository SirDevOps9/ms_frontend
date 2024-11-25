import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManListTeamComponent } from './man-list-team.component';

describe('ManListTeamComponent', () => {
  let component: ManListTeamComponent;
  let fixture: ComponentFixture<ManListTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManListTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManListTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
