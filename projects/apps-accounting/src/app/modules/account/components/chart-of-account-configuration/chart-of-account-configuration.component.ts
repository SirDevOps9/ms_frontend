import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../account.service';
import { GetLevelsDto } from '../../models/getLevelsDto';
import { FormArray } from '@angular/forms';
import { AddLevelsDto } from '../../models/addLevelsDto';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-chart-of-account-configuration',
  templateUrl: './chart-of-account-configuration.component.html',
  styleUrls: ['./chart-of-account-configuration.component.css']
})
export class ChartOfAccountConfigurationComponent implements OnInit {


  tableData: GetLevelsDto[];
  fa: FormArray<>

  constructor(private accountService: AccountService,
    private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.initChartOfAccountData();
  }

  initChartOfAccountData() {

    this.accountService.getLevels().subscribe({
      next: (ChartOfAccountList: any) => {
        this.tableData = ChartOfAccountList.result;
        console.log('this.tableData', this.tableData);
      },
    });
  }

  save(dto:AddLevelsDto) {
    this.accountService.addLevels(dto).subscribe({
      next: (ChartOfAccountList: any) => {
      },
    });
    }

  close() {
    this.ref .close();
    }
    
  deleteLine(index: number) {
    this.fa.removeAt(index);
    }


}
