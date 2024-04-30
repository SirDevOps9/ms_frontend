import { Component, OnInit } from '@angular/core';
import {
  EditJournalEntry,
  EditJournalEntryLine,
  GetJournalEntryByIdDto,
  JournalEntryLineDto,
} from '../../models';
import { JournalEntryService } from '../../journal-entry.service';
import { FormsService, RouterService } from 'shared-lib';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-journal-entry',
  templateUrl: './edit-journal-entry.component.html',
  styleUrls: ['./edit-journal-entry.component.scss'],
  providers: [RouterService],
})
export class EditJournalEntryComponent implements OnInit {
  editJournalForm: FormGroup;
  journalEntry?: GetJournalEntryByIdDto;
  journalEntryLines?: JournalEntryLineDto[];

  ngOnInit() {
    this.initializeForm();
    this.initializeFormData();
  }

  initializeForm() {
    this.editJournalForm = this.fb.group({
      journalCode: new FormControl(),
      referenceNumber: new FormControl(),
      journalDate: new FormControl(),
      description: new FormControl(),
      journalPeriod: new FormControl(),
      type: new FormControl(),
      sourceName: new FormControl(),
      sourceCode: new FormControl(),
     // reversedJournalCode: new FormControl(),
      status: new FormControl(),
      totalDebitAmount: new FormControl(),
      totalCreditAmount: new FormControl(),
      journalEntryLines: this.fb.array([
        this.fb.group({
          id: new FormControl(),
          accountId: new FormControl(),
          accountName: new FormControl(),
          lineDescription: new FormControl(),
          debitAmount: new FormControl(),
          creditAmount: new FormControl(),
          currencyId: new FormControl(),

          currency: new FormControl(),
          currencyRate: new FormControl(),
          debitAmountLocal: new FormControl(),
          creditAmountLocal: new FormControl(),
        }),
      ]),
    });
  }

  initializeFormData() {
    this.journalEntryService
      .getJournalEntryById(this.journalEntryId)
      .subscribe((res) => {
        
        this.editJournalForm.patchValue({
          ...res,
        });

        console.log('form value', this.editJournalForm.value);
        this.journalEntry = res;
        this.journalEntryLines = res.journalEntryLines!;

        const journalEntryLinesArray = this.editJournalForm.get(
          'journalEntryLines'
        ) as FormArray;
        journalEntryLinesArray.clear();

        this.journalEntryLines.forEach((line) => {
          journalEntryLinesArray.push(this.fb.group(line));
        });
      });
  }

  onSubmit() {
    if (!this.formsService.validForm(this.editJournalForm, true)) return;
     const request: EditJournalEntry = this.editJournalForm.value;
     request.id = this.journalEntryId;


    // const request: EditJournalEntry = {
    //   id: this.editJournalForm.get('id')?.value,
    //   referenceNumber: this.editJournalForm.get('referenceNumber')?.value,
    //   journalDate: this.editJournalForm.get('journalDate')?.value,
    //   description: this.editJournalForm.get('description')?.value,
    //   journalEntryLines: this.editJournalForm.get('journalEntryLines')?.value
    // };


    // const journalEntryLinesArray = this.editJournalForm.get(
    //   'journalEntryLines'
    // ) as FormArray;
    // const lineIds = journalEntryLinesArray.value.map((line: any) => line.id);
    // request.journalEntryLines?.forEach(
    //   (line: EditJournalEntryLine, index: number) => {
    //     line.id = lineIds[index];
    //   }
    // );

    this.journalEntryService.editJournalEntry(request);
  }

  get journalEntryId(): number {
    return this.routerService.currentId;
  }

  onDiscard() {
    this.editJournalForm.reset();
   // this.initializeForm();
    this.initializeFormData();

  }

  get journalEntryLinesFormArray() {
    return this.editJournalForm.get('journalEntryLines') as FormArray;
  }

  constructor(
    private journalEntryService: JournalEntryService,
    private routerService: RouterService,
    private fb: FormBuilder,
    private formsService: FormsService
  ) {}
}
