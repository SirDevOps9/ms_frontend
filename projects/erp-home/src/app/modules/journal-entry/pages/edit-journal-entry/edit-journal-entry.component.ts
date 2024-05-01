import { Component, OnInit } from '@angular/core';
import {
  EditJournalEntry,
  EditJournalEntryLine,
  GetJournalEntryByIdDto,
  JournalEntryLineDto,
  JournalEntryStatus,
  JournalEntryType,
} from '../../models';
import { JournalEntryService } from '../../journal-entry.service';
import { FormsService, RouterService, customValidators } from 'shared-lib';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { JournalStatusUpdate } from '../../models/update-status';

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
  accountIdList: number[] = [];
  currencyIdList: number[] = [];
  viewMode: boolean = false;
  statusName: string;
  journalTypeName: string;

  ngOnInit() {
    this.initializeForm();
    this.initializeFormData();
  }

  initializeForm() {
    this.editJournalForm = this.fb.group({
      journalCode: new FormControl(),
      referenceNumber: new FormControl(),
      journalDate: new FormControl('', [
        customValidators.required,
        customValidators.notOnlyWhitespaceValidator,
      ]),
      description: new FormControl(),
      journalPeriod: new FormControl(),
      type: new FormControl(),
      sourceName: new FormControl(),
      sourceCode: new FormControl(),
      reversedJournalCode: new FormControl(),
      status: new FormControl(),
      totalDebitAmount: new FormControl(),
      totalCreditAmount: new FormControl(),
      journalEntryLines: this.fb.array([
        this.fb.group({
          id: new FormControl(),
          //accountCode: new FormControl(),
          accountId: new FormControl(),

          accountName: new FormControl(),
          lineDescription: new FormControl(),
          debitAmount: new FormControl('', [customValidators.required]),
          creditAmount: new FormControl('', [customValidators.required]),
          currency: new FormControl(),
          currencyRate: new FormControl('', [customValidators.required]),
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

        if (res.status === JournalEntryStatus.Posted) {
          this.viewMode = true;
        }
        this.statusName = JournalEntryStatus[res.status];
        this.journalTypeName = JournalEntryType[res.type];

        this.journalEntry = res;
        this.journalEntryLines = res.journalEntryLines!;

        const journalEntryLinesArray = this.journalEntryLinesFormArray;
        journalEntryLinesArray.clear();

        this.journalEntryLines.forEach((line) => {
          const { currencyId, ...lineData } = line;
          journalEntryLinesArray.push(this.fb.group(lineData));

          this.currencyIdList.push(currencyId);
        });
      });
  }

  onSubmit() {
    if (!this.formsService.validForm(this.editJournalForm, true)) return;

    const request: EditJournalEntry = this.editJournalForm.value;
    request.id = this.journalEntryId;
    request.journalEntryLines = this.journalEntryLinesFormArray?.value.map(
      (line: any, index: number) => ({
        ...line,
        //accountId: this.accountIdList[index],
        currencyId: this.currencyIdList[index],
      })
    );

    this.journalEntryService.editJournalEntry(request);
  }

  get journalEntryId(): number {
    return this.routerService.currentId;
  }


  updateStatus(status:number)
  {
    let journalStatus = new JournalStatusUpdate();
        journalStatus.id = this.routerService.currentId;
        journalStatus.status = status;
        console.log(status);
        console.log(journalStatus.id);
     this.journalEntryService.ChangeStatus(journalStatus).subscribe(() => {
      setTimeout(() => {
        location.reload();
      }, 1500);
      
     });
  }

  onDiscard() {
    //this.editJournalForm.reset();
    //this.initializeFormData();
    window.location.reload();
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
