import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJournalEntryOpeningBalanceComponent } from './view-journal-entry-opening-balance.component';

describe('ViewJournalEntryOpeningBalanceComponent', () => {
  let component: ViewJournalEntryOpeningBalanceComponent;
  let fixture: ComponentFixture<ViewJournalEntryOpeningBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewJournalEntryOpeningBalanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewJournalEntryOpeningBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
