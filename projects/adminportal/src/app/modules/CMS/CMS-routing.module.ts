import { BreadcrumbLabel } from "shared-lib";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AddCMSComponent } from "./pages/add-cms/add-cms.component";
import { EditCMSComponent } from "./pages/edit-cms/edit-cms.component";
import { ListCMSComponent } from "./pages/list-cms/list-cms.component";

const routes: Routes = [
    {
      path: '',
      component: ListCMSComponent,
      data: {
        breadcrumb: BreadcrumbLabel.HELP_PAGES,
      },
    },
    {
        path: 'add-CMS',
        component: AddCMSComponent,
        data: {
          breadcrumb: BreadcrumbLabel.Add_Help_Page,
        },
      },
    {
        path: 'edit-CMS/:id',
        component: EditCMSComponent,
        data: {
          breadcrumb: BreadcrumbLabel.Edit_Help_Page,
        },
      },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CMSRoutingModule {}
  