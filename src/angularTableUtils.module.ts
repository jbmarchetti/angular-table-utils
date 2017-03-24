import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { DashPipe } from './pipes/dash.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { DataTableModule } from 'angular2-datatable';

@NgModule({
  declarations: [
    TableComponent,
    DashPipe
  ],
  imports: [CommonModule, TranslateModule, DataTableModule],
  exports: [TableComponent, DashPipe]
})
export class AngularTableUtilsModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AngularTableUtilsModule
    };
  }

}