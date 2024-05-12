import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TreeTableModule } from 'primeng/treetable';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FullCalendarModule } from '@fullcalendar/angular';

const sharedComponents = [
  ButtonModule,
  InputTextModule,
  CalendarModule,
  DropdownModule,
  TableModule,
  PaginatorModule,
  DialogModule,
  TooltipModule,
  FileUploadModule,
  ToastModule,
  RippleModule,
  TabMenuModule,
  TabViewModule,
  TreeTableModule,
  CheckboxModule,
  InputSwitchModule,
  MenuModule,
  CardModule,
  AutoCompleteModule,
  FieldsetModule,
  InputTextareaModule,
  PasswordModule,
  MultiSelectModule,
  RadioButtonModule,
  FullCalendarModule
];
@NgModule({
  declarations: [],
  imports: [CommonModule, ...sharedComponents],
  exports: [...sharedComponents],
})
export class PrimengModule {}
