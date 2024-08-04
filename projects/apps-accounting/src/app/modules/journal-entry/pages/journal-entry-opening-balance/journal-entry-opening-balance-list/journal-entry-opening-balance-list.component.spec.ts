import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEntryOpeningBalanceListComponent } from './journal-entry-opening-balance-list.component';

describe('JournalEntryOpeningBalanceListComponent', () => {
  let component: JournalEntryOpeningBalanceListComponent;
  let fixture: ComponentFixture<JournalEntryOpeningBalanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JournalEntryOpeningBalanceListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JournalEntryOpeningBalanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
