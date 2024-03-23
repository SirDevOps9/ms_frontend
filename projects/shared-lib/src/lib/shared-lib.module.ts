import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  LayoutComponent,
  ErpTableComponent,
  SearchEngineComponent,
  LoaderComponent,
  DataTableComponent,
  AttachmentViewerComponent,
} from './components';
import {
  FieldValidationsComponent,
  FormGroupComponent,
  LabelComponent,
  SelectComponent,
  TextInputComponent,
  MultiSelectComponent,
  ButtonComponent,
} from './form-components';
import { DropdownModule } from 'primeng/dropdown';
import { GetLookupPipe } from './pipes/lookupList';
import { PageContentComponent } from './components/page-content/page-content.component';
import { PrimeSharedModule } from './prime-module/prime.module';
import { FileUploaderComponent } from './form-components/file-uploader/file-uploader.component';
import { TreeTableModule } from 'primeng/treetable';
import { MatPaginatorModule } from '@angular/material/paginator';

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
    FileUploaderComponent,
    MultiSelectComponent,
    DataTableComponent,
    AttachmentViewerComponent,
    ButtonComponent,
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
    PrimeSharedModule,
    TreeTableModule,
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
    PrimeSharedModule,
    FileUploaderComponent,
    MultiSelectComponent,
    DataTableComponent,
    AttachmentViewerComponent,
    ButtonComponent,
  ],
})
export class SharedLibModule {}
