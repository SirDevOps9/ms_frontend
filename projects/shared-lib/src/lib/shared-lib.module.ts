import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  LayoutComponent,
  SearchEngineComponent,
  LoaderComponent,
  DataTableComponent,
  TablePaginatorComponent,
  
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
import { InputSwitchComponent } from './form-components/input-switch/input-switch.component';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { RatingComponent } from './form-components/rating/rating.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { AttachmentViewerComponent } from './components/attachment-viewer/attachment-viewer.component';

@NgModule({
  declarations: [
    GetLookupPipe,
    LayoutComponent,
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
    InputSwitchComponent,
    BreadCrumbComponent,
    TablePaginatorComponent,
    RatingComponent,
    PaginatorComponent,
    AccordionComponent,
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
    InputSwitchComponent,
    BreadCrumbComponent,
    TablePaginatorComponent,
    RatingComponent,
    PaginatorComponent,
    AccordionComponent,
  ],
})
export class SharedLibModule {}
