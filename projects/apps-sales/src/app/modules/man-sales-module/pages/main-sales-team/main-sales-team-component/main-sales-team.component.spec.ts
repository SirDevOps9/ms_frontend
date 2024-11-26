import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSalesTeamComponent } from './main-sales-team.component';

describe('MainSalesTeamComponent', () => {
  let component: MainSalesTeamComponent;
  let fixture: ComponentFixture<MainSalesTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainSalesTeamComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainSalesTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
