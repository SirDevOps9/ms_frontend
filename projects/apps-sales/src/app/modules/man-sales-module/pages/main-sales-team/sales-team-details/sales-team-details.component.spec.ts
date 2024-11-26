import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTeamDetailsComponent } from './sales-team-details.component';

describe('SalesTeamDetailsComponent', () => {
  let component: SalesTeamDetailsComponent;
  let fixture: ComponentFixture<SalesTeamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesTeamDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesTeamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
