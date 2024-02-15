import { ModuleWithProviders, NgModule } from '@angular/core';
import { BaseService } from './services/base.httpservice';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutComponent } from './components/layout/layout.component';
import { ErpTableComponent } from './components/erp-table/erp-table.component';
import { SearchEngineComponent } from './components/search-engine/search-engine.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ErpTableComponent,
    SearchEngineComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    TranslateModule.forRoot(),
  ],
  exports: [
    LayoutComponent,
    ErpTableComponent,
    SearchEngineComponent,
    LoaderComponent,
  ],
})
export class SharedLibModule {
  public static forRoot(
    environment: any
  ): ModuleWithProviders<SharedLibModule> {
    return {
      ngModule: SharedLibModule,
      providers: [
        BaseService,
        {
          provide: 'env',
          useValue: environment,
        },
      ],
    };
  }
}
