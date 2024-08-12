import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOpeningBalanceComponent } from './main-opening-balance.component';

describe('MainOpeningBalanceComponent', () => {
  let component: MainOpeningBalanceComponent;
  let fixture: ComponentFixture<MainOpeningBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainOpeningBalanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainOpeningBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
