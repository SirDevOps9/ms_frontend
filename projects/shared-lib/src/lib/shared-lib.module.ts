import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutComponent } from './components/layout/layout.component';
import { ErpTableComponent } from './components/erp-table/erp-table.component';
import { SearchEngineComponent } from './components/search-engine/search-engine.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoaderComponent } from './components/loader/loader.component';
import {
  FieldValidationsComponent,
  FormGroupComponent,
  LabelComponent,
  SelectComponent,
  TextInputComponent,
} from './form-components';
import { DropdownModule } from 'primeng/dropdown';
import { GetLookupPipe } from './pipes/lookupList';
import { PageContentComponent } from './components/page-content/page-content.component';
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
    FormGroupComponent,
    PageContentComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    DropdownModule,
    MatPaginatorModule,
    TranslateModule.forRoot(),
    FormsModule,
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
    FormGroupComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    PageContentComponent,
  ],
})
export class SharedLibModule {}
