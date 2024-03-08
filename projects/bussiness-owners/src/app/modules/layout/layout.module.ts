import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MicrotecAuthLibModule } from "microtec-auth-lib";
import {  SharedLibModule } from "shared-lib";
import { LayoutComponent } from "./layout-page/layout.component";

@NgModule({
    providers: [],
    declarations: [LayoutComponent],
    imports: [
      MicrotecAuthLibModule,
      SharedLibModule,
      HttpClientModule,
    ],
    exports: [],
  })
  export class LayoutModule {}
  