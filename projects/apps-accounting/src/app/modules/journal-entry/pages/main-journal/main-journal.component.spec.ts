import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainJournalComponent } from './main-journal.component';

describe('MainJournalComponent', () => {
  let component: MainJournalComponent;
  let fixture: ComponentFixture<MainJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainJournalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
