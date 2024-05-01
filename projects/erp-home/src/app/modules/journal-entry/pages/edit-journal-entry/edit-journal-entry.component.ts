import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  EditJournalEntry,
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
      journalEntryLines: this.fb.array([]),
    });
  }

  initializeFormData() {
    this.journalEntryService
      .getJournalEntryById(this.journalEntryId)
      .subscribe((res) => {
        this.editJournalForm.patchValue({
          ...res,
        });

        console.log('callin init 1', this.editJournalForm.value);

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

          journalEntryLinesArray.push(
            this.fb.group({
              id: new FormControl(lineData.id),
              //accountCode: new FormControl(),
              accountId: new FormControl(lineData.accountId),
              accountName: new FormControl(lineData.accountName),
              lineDescription: new FormControl(lineData.lineDescription),
              debitAmount: new FormControl(lineData.debitAmount, [customValidators.required]),
              creditAmount: new FormControl(lineData.creditAmount, [customValidators.required]),
              currency: new FormControl(lineData.currency),
              currencyRate: new FormControl(lineData.currencyRate, [customValidators.required]),
              debitAmountLocal: new FormControl(lineData.debitAmountLocal),
              creditAmountLocal: new FormControl(lineData.creditAmountLocal),
            })
          );

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
    this.editJournalForm.reset();
    this.initializeFormData();
  }



  get journalEntryLinesFormArray() {
    return this.editJournalForm.get('journalEntryLines') as FormArray;
  }

  ValueChanges(event: any, index: number) {
    const journalLine = this.journalEntryLinesFormArray.at(index);

    const currencyRateControl = journalLine.get('currencyRate');
    const debitAmountControl = journalLine.get('debitAmount');
    const creditAmountControl = journalLine.get('creditAmount');
    const debitAmountLocalControl = journalLine.get('debitAmountLocal');
    const creditAmountLocalControl = journalLine.get('creditAmountLocal');

    // Subscribe to changes in debit amount
    debitAmountControl?.valueChanges.subscribe((value) => {
      const debitAmountLocal = value * currencyRateControl?.value;
      debitAmountLocalControl?.setValue(debitAmountLocal);
    });

    // Subscribe to changes in credit amount
    creditAmountControl?.valueChanges.subscribe((value) => {
      const creditAmountLocal = value * currencyRateControl?.value;
      creditAmountLocalControl?.setValue(creditAmountLocal);
    });

    // Subscribe to changes in currency rate
    currencyRateControl?.valueChanges.subscribe((value) => {
      // Update debit amount local only if debit amount exists
      if (
        debitAmountControl?.value !== null &&
        debitAmountControl?.value !== undefined
      ) {
        const debitAmountLocal = debitAmountControl?.value * value;
        debitAmountLocalControl?.setValue(debitAmountLocal);
      }

      // Update credit amount local only if credit amount exists
      if (
        creditAmountControl?.value !== null &&
        creditAmountControl?.value !== undefined
      ) {
        const creditAmountLocal = creditAmountControl?.value * value;
        creditAmountLocalControl?.setValue(creditAmountLocal);
      }
    });
  }

  constructor(
    private journalEntryService: JournalEntryService,
    private routerService: RouterService,
    private fb: FormBuilder,
    private formsService: FormsService
  ) {}
}
