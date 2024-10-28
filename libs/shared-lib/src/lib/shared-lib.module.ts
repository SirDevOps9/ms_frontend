import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  LayoutComponent,
  SearchEngineComponent,
  LoaderComponent,
  DataTableComponent,
  TablePaginatorComponent,
  ButtonMicroComponent,
  ToastComponent,
  TablePrintComponent,
  TabviewComponent,
} from './components';
import {
  FieldValidationsComponent,
  FormGroupComponent,
  LabelComponent,
  SelectComponent,
  TextInputComponent,
  MultiSelectComponent,
  ButtonComponent,
  SharedFormComponent,
  ToggelComponent,
  EditMultipeFilesComponent,
} from './form-components';
import { DropdownModule } from 'primeng/dropdown';
import { GetLookupPipe } from './pipes/lookupList';
import { InputTextareaModule } from 'primeng/inputtextarea';

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
import { TreeModule } from 'primeng/tree';
import { NamedFileUploaderComponent } from './form-components/named-file-uploader/named-file-uploader.component';
import { FildestComponent } from './components/fildest/fildest.component';
import { GetElementByIDPipe } from './pipes/get-element-by-id.pipe';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectIconComponent } from './form-components/selectIcon/selectIcon.component';
import { UploadMultipeFilesComponent } from './form-components/upload-multipe-files/upload-multipe-files.component';
import { CalendarComponent } from './form-components/calendar/calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { ExportComponent } from './components/export/export.component';
import { ChangeColumnComponent } from './components/change-column/change-column.component';
import { NumberFormatPipe } from './pipes/number-format.pipe';
import { PopupPageComponent } from './components/popup-page/popup-page.component';
import { NumberFormatDirective } from './directives/numberFormatDirective';
import { QRCodeModule } from 'angularx-qrcode';
import { ColumnsSelectionComponent } from './form-components/columns-selection/columns-selection.component';
import { ActtachmentViewComponent } from 'libs/apps-shared-lib/src/lib/pages/attachment-view/acttachment-view/acttachment-view.component';
import { NewBreadCrumbComponent } from './components/new-bread-crumb/new-bread-crumb.component';

@NgModule({
  declarations: [
    NumberFormatDirective,
    GetLookupPipe,
    LayoutComponent,
    SearchEngineComponent,
    LoaderComponent,
    FieldValidationsComponent,
    LabelComponent,
    TextInputComponent,
    SelectComponent,
    SelectIconComponent,
    FormGroupComponent,
    PageContentComponent,
    FileUploaderComponent,
    NamedFileUploaderComponent,
    MultiSelectComponent,
    EditMultipeFilesComponent,
    DataTableComponent,
    AttachmentViewerComponent,
    ButtonComponent,
    InputSwitchComponent,
    BreadCrumbComponent,
    NewBreadCrumbComponent,
    TablePaginatorComponent,
    RatingComponent,
    PaginatorComponent,
    AccordionComponent,
    SharedFormComponent,
    FildestComponent,
    ButtonMicroComponent,
    ToggelComponent,
    GetElementByIDPipe,
    ToastComponent,
    UploadMultipeFilesComponent,
    CalendarComponent,
    TablePrintComponent,
    TabviewComponent,
    ExportComponent,
    ChangeColumnComponent,
    NumberFormatPipe,
    PopupPageComponent,ColumnsSelectionComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    DropdownModule,
    MatPaginatorModule,
    TranslateModule,
    FormsModule,
    PrimeSharedModule,
    TreeTableModule,
    TreeModule,
    ProgressSpinnerModule,
    QRCodeModule,
    InputTextareaModule
    
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
    SelectIconComponent,
    FormGroupComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    NamedFileUploaderComponent,
    PageContentComponent,
    PrimeSharedModule,
    FileUploaderComponent,
    MultiSelectComponent,
    EditMultipeFilesComponent,
    DataTableComponent,
    AttachmentViewerComponent,
    ButtonComponent,
    InputSwitchComponent,
    BreadCrumbComponent,
    NewBreadCrumbComponent,
    TablePaginatorComponent,
    RatingComponent,
    PaginatorComponent,
    AccordionComponent,
    TreeModule,
    ProgressSpinnerModule,
    SharedFormComponent,
    FildestComponent,
    ButtonMicroComponent,
    ToggelComponent,
    CalendarComponent,
    GetElementByIDPipe,
    ToastComponent,
    UploadMultipeFilesComponent,
    TablePrintComponent,
    TabviewComponent,
    ExportComponent,
    ChangeColumnComponent,
    NumberFormatPipe,
    PopupPageComponent,
    NumberFormatDirective,
    QRCodeModule,ColumnsSelectionComponent,
    InputTextareaModule
  ],
})
export class SharedLibModule {}
