import { BreadcrumbLabel } from "shared-lib";
import { ListHelpPageComponent } from "./pages/list-help-page/list-help-page.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AddHelpPageComponent } from "./pages/add-help-page/add-help-page.component";
import { EditHelpsPagesComponent } from "./pages/edit-helps-pages/edit-helps-pages.component";

const routes: Routes = [
    {
      path: '',
      component: ListHelpPageComponent,
      data: {
        breadcrumb: BreadcrumbLabel.HELP_PAGES,
      },
    },
    {
        path: 'add-page/:id',
        component: AddHelpPageComponent,
        data: {
          breadcrumb: BreadcrumbLabel.Add_Help_Page,
        },
      },
    {
        path: 'edit-page/:id',
        component: EditHelpsPagesComponent,
        data: {
          breadcrumb: BreadcrumbLabel.Edit_Help_Page,
        },
      },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class HelpPagesRoutingModule {}
  