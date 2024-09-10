import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuModule, Modules } from 'shared-lib';
import { debounceTime } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TextInputComponent } from 'libs/shared-lib/src/lib/form-components';
import { LayoutService } from '../../modules/layout/layout.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'lib-module-list',
  templateUrl: './module-list.component.html',
  styleUrl: './module-list.component.scss',
})
export class ModuleListComponent implements OnInit {
  @ViewChild('inputElement', { static: false }) inputElement: TextInputComponent;
  nameControl = new FormControl('');
  moduleList: MenuModule[];

  ngOnInit() {
    this.moduleList = this.layoutService.getModules();
    this.nameControl.valueChanges.pipe(debounceTime(500)).subscribe((res: any) => {
      const searchTerm = res.toLowerCase();
      this.moduleList = this.layoutService
        .getModules()
        .filter((elem) => elem.module.toLowerCase().includes(searchTerm));
    });
  }


close(){
  this.ref.close()
}
  navigateto(key: number) {
    if (key === Modules.Hr) {
      location.href = '../hr';
    } else if (key === Modules.Accounting) {
      location.href = '../accounting';
    } else if (key === Modules.GeneralSettings) {
      location.href = '../erp';
    } else if (key === Modules.Sales) {
      location.href = '../sales';
    } else if (key === Modules.Finance) {
      location.href = '../finance';
    } else if (key === Modules.Purchase) {
      location.href = '../purchase';
    }else if (key === Modules.inventory) {
      location.href = '../inventory';
    }
  }

  constructor(public layoutService: LayoutService , private ref : DynamicDialogRef) {}
}
