import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainListTeamComponent } from './main-list-team.component';

describe('MainListTeamComponent', () => {
  let component: MainListTeamComponent;
  let fixture: ComponentFixture<MainListTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainListTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainListTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
