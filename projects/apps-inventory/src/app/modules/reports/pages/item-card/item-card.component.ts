import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { DateTimeService, LanguageService, PrintService, ToasterService } from 'shared-lib';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent {
  itemTransactionForm: FormGroup;
  moreInfoForm: FormGroup;
  // filteredAccounts: AccountsChildrenDropDown[] = [];
  // defoultSelectedAcounts: number[] = [];
  tableData: any[] = [];
  // reportsService = inject(ReportsService);
  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private ToasterService: ToasterService,
    private PrintService: PrintService,
    private dateTimeService: DateTimeService,
    private router: Router,
    private dialog: DialogService
  ) {}
  ngOnInit() {
    this.tableData = [];
    this.itemTransactionFormInitiate();
  }
  printTable(id: string) {
    this.PrintService.print(id);
  }

  itemTransactionFormInitiate() {
    this.itemTransactionForm = this.fb.group({
      search: [''],
    });
  }

  moreInfoFormInitiate() {}

  itemTransactionSubmit() {}
  viewItemTransaction() {}


}
