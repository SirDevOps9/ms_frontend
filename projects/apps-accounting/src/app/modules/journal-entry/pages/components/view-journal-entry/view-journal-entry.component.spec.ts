import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJournalEntryComponent } from './view-journal-entry.component';

describe('ViewJournalEntryComponent', () => {
  let component: ViewJournalEntryComponent;
  let fixture: ComponentFixture<ViewJournalEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewJournalEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewJournalEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
