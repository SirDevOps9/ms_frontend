import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuModule, Modules } from 'shared-lib';
import { AuthService } from 'microtec-auth-lib';
import { debounceTime, fromEvent, map, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TextInputComponent } from 'libs/shared-lib/src/lib/form-components';

@Component({
  selector: 'lib-module-list',
  templateUrl: './module-list.component.html',
  styleUrl: './module-list.component.scss'
})
export class ModuleListComponent implements OnInit {
  @ViewChild('inputElement', { static: false }) inputElement: TextInputComponent;
  nameControl = new FormControl('');
  moduleList: MenuModule[];


  ngOnInit() {
    this.moduleList = this.authService.getModules();
    this.nameControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe((res: any) => {
      const searchTerm = res.toLowerCase();
      this.moduleList = this.authService.getModules().filter(elem =>
        elem.module.toLowerCase().includes(searchTerm)
      );
    })
  }

  navigateto(key: number) {
    if (key === Modules.Hr) {
      location.href = '../hr';
    } else if (key === Modules.Accounting) {
      location.href = '../accounting';
    } else if (key === Modules.GeneralSettings) {
      location.href = '../erp';
    }
  }
  
  constructor(
    public authService: AuthService,

  ) { }

}
