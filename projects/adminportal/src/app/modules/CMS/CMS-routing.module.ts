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
        breadcrumb: BreadcrumbLabel.CMS,
      },
    },
    {
        path: 'add-CMS',
        component: AddCMSComponent,
        data: {
          breadcrumb: BreadcrumbLabel.Add_CMS,
        },
      },
    {
        path: 'edit-CMS/:id',
        component: EditCMSComponent,
        data: {
          breadcrumb: BreadcrumbLabel.Edit_CMSe,
        },
      },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CMSRoutingModule {}
  