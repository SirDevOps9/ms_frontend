import { Component, inject } from '@angular/core';
import { LayoutService } from 'apps-shared-lib';
import { CompanyTypes } from 'projects/bussiness-owners/src/app/modules/company/models';
import { skip, take } from 'rxjs';
import { StorageService, StorageKeys } from 'shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'apps-hr';
}
