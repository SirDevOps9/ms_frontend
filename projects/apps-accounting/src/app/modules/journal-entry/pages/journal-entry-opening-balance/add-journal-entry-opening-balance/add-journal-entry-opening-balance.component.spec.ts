import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJournalEntryOpeningBalanceComponent } from './add-journal-entry-opening-balance.component';

describe('AddJournalEntryOpeningBalanceComponent', () => {
  let component: AddJournalEntryOpeningBalanceComponent;
  let fixture: ComponentFixture<AddJournalEntryOpeningBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddJournalEntryOpeningBalanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddJournalEntryOpeningBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
