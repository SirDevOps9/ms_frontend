import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { LanguageService, MenuModule, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { ItemsService } from '../../../items.service';

@Component({
  selector: 'app-add-stock-in',
  templateUrl: './add-stock-in.component.html',
  styleUrl: './add-stock-in.component.scss',
})
export class AddStockInComponent implements OnInit {
  stockInForm: FormGroup = new FormGroup({});

  tableData: any[];

  exportData: any[];
  cols = [
    {
      field: 'Code',
      header: 'code',
    },

    {
      field: 'Name',
      header: 'name',
    },
    {
      field: 'Short Name',
      header: 'shortName',
    },
  ];
  exportSelectedCols: string[] = [];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;

  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private langService: LanguageService,
    private itemsService: ItemsService,
    private fb: FormBuilder
  ) {
    this.title.setTitle(this.langService.transalte('itemCategory.itemDefinition'));
  }
  ngOnInit(): void {
    this.stockInForm = this.fb.group({
      receiptDate: '',
      code : '',
      stockInStatus: '',
      sourceDocumentType: '',
      sourceDocumentId: 0,
      warehouseId: 0,
      notes: '',
      stockInDetails: this.fb.array([]),
    });
  }

  get stockIn() {
    return this.stockInForm.get('stockInDetails') as FormArray;
  }

  onEdit(data: any) {}

  createStockIn() {
    return this.fb.group({
      barCode: '',                
      bardCodeId: 0,              
      description: '',            
      itemId: 0,                  
      uomId: '',  
      quantity: 0,                
      cost: 0,                    
      notes: '',                  
      stockInEntryMode: '', 
      trackingType: '', 
      stockInTracking: this.fb.group({
        vendorBatchNo: '',         
        expireDate: '', 
        systemPatchNo: '',         
        serialId: '',              
        trackingType: '' 
      })
    });
  }

  addLineStockIn() {
    this.stockIn.push(this.createStockIn())
  }

  onCancel() {}

  onSave() {}
}
