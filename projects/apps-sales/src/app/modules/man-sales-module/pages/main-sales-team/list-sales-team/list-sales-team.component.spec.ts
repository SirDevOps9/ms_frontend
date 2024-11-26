import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListSalesTeamComponent } from './list-sales-team.component';


describe('ListSalesTeamComponent', () => {
  let component: ListSalesTeamComponent;
  let fixture: ComponentFixture<ListSalesTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSalesTeamComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListSalesTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
