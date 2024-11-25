import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMainTeamComponent } from './add-main-team.component';

describe('AddMainTeamComponent', () => {
  let component: AddMainTeamComponent;
  let fixture: ComponentFixture<AddMainTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMainTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMainTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
