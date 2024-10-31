import { MessageModule } from 'primeng/message';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AccordionModule } from 'primeng/accordion';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { PaginatorModule } from 'primeng/paginator';
import { RatingModule } from 'primeng/rating';
import { CalendarModule } from 'primeng/calendar';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { MenuModule } from 'primeng/menu';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { SplitButtonModule } from 'primeng/splitbutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
  providers: [DialogService , MessageService],
  declarations: [
  ],
  imports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    BreadcrumbModule,
    InputSwitchModule,
    DropdownModule,
    SidebarModule,
    DialogModule,
    MultiSelectModule,
    ToggleButtonModule,
    AccordionModule,
    DynamicDialogModule,
    PasswordModule,
    CheckboxModule,
    PaginatorModule,
    RadioButtonModule,
    CalendarModule,
    ToastModule,
    MessageModule,
    TabViewModule,
    MenuModule,
    InputGroupAddonModule,
    InputGroupModule,
    SplitButtonModule,
    OverlayPanelModule
  ],
  exports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    BreadcrumbModule,
    InputSwitchModule,
    DropdownModule,
    SidebarModule,
    DialogModule,
    MultiSelectModule,
    ToggleButtonModule,
    AccordionModule,
    DynamicDialogModule,
    PasswordModule,
    CheckboxModule,
    PaginatorModule, 
    RatingModule,
    CalendarModule,
    FieldsetModule,
    RadioButtonModule,
    ToastModule,
    MessageModule,
    TabViewModule,
    InputGroupAddonModule,
    MenuModule,
    InputGroupModule,
    OverlayPanelModule,
    
    SplitButtonModule
  ],
})
export class PrimeSharedModule {}
