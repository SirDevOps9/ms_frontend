import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJournalEntryOpeningBalanceComponent } from './edit-journal-entry-opening-balance.component';

describe('EditJournalEntryOpeningBalanceComponent', () => {
  let component: EditJournalEntryOpeningBalanceComponent;
  let fixture: ComponentFixture<EditJournalEntryOpeningBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditJournalEntryOpeningBalanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditJournalEntryOpeningBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
