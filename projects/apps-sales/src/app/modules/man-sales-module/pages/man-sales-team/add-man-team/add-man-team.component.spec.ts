import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManTeamComponent } from './add-man-team.component';

describe('AddManTeamComponent', () => {
  let component: AddManTeamComponent;
  let fixture: ComponentFixture<AddManTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddManTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddManTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
