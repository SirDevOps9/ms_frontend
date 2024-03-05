import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutComponent } from './components/layout/layout.component';
import { ErpTableComponent } from './components/erp-table/erp-table.component';
import { SearchEngineComponent } from './components/search-engine/search-engine.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoaderComponent } from './components/loader/loader.component';
import {
  FieldValidationsComponent,
  LabelComponent,
  SelectComponent,
  TextInputComponent,
} from './form-components';
import { DropdownModule } from 'primeng/dropdown';
import { GetLookupPipe } from './pipes/lookupList';
@NgModule({
  declarations: [
    GetLookupPipe,
    LayoutComponent,
    ErpTableComponent,
    SearchEngineComponent,
    LoaderComponent,
    FieldValidationsComponent,
    LabelComponent,
    TextInputComponent,
    SelectComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    DropdownModule,
    MatPaginatorModule,
    TranslateModule.forRoot(),
  ],
  exports: [
    GetLookupPipe,
    LayoutComponent,
    ErpTableComponent,
    SearchEngineComponent,
    LoaderComponent,
    FieldValidationsComponent,
    LabelComponent,
    TextInputComponent,
    SelectComponent,
  ],
})
export class SharedLibModule {}
