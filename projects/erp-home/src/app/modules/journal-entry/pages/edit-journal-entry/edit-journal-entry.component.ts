import { Component, OnInit } from '@angular/core';
import {
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
})
export class EditJournalEntryComponent implements OnInit {
  editJournalForm: FormGroup;
  journalEntry: GetJournalEntryByIdDto;
  journalEntryLinesVar: JournalEntryLineDto[];




  ngOnInit() {
    this.initializeForm();
    this.initializeFormData();
  }



  initializeForm() {
    this.editJournalForm = this.fb.group({
      journalCode: new FormControl(),
      referenceNumber: new FormControl(),
      createdOn: new FormControl(),
      description: new FormControl(),
      journalPeriod: new FormControl(),
      type: new FormControl(),
      sourceName: new FormControl(),
      sourceCode: new FormControl(),
      isRepeated: new FormControl(),
      isReversed: new FormControl(),
      reversedJournalCode: new FormControl(),
      status: new FormControl(),
      totalDebitAmount: new FormControl(),
      totalCreditAmount: new FormControl(),
      journalEntryLines: this.fb.array([
        this.fb.group({
          id: new FormControl(),
          accountCode: new FormControl(),
          accountName: new FormControl(),
          lineDescription: new FormControl(),
          debitAmount: new FormControl(),
          creditAmount: new FormControl(),
          currency: new FormControl(),
          currencyRate: new FormControl(),
          debitAmountLocal: new FormControl(),
          creditAmountLocal: new FormControl(),
        }),
      ]),
    });
  }
  
  initializeFormData() {
    this.journalEntryService.getJournalEntryById(1).subscribe((res) => {
      this.editJournalForm.patchValue({
        ...res,
      });
      this.journalEntry = res;
      this.journalEntryLinesVar = res.journalEntryLines!;

      const journalEntryLinesArray = this.editJournalForm.get('journalEntryLines') as FormArray;
      journalEntryLinesArray.clear();
      
      this.journalEntryLinesVar.forEach((line) => {
        journalEntryLinesArray.push(this.fb.group(line));
      });
    });
  }

  onSubmit() {
    // if (!this.formsService.validForm(this.editBrancheForm, true)) return;
    // const request: EditBranchDto = this.editBrancheForm.value;
    // request.id = this.currentBranchId;
    // this.companyService.editBranch(request, this.ref);
  }

  get journalEntryId(): number {
    return this.routerService.currentId;
  }

  save() {
    console.log(this.journalEntry);
  }

  get journalEntryLines() {
    return this.editJournalForm.get('journalEntryLines') as FormArray;
  }
  constructor(
    private journalEntryService: JournalEntryService,
    private routerService: RouterService,
    private fb: FormBuilder,
    private formsService: FormsService
  ) {}
}
