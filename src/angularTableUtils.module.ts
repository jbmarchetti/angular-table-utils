import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { DashPipe } from './pipes/dash.pipe';
import { DataTableModule } from 'angular2-datatable';
import { AngularFormsUtilsModule } from 'angular-forms-utils'

@NgModule({
  declarations: [
    TableComponent,
    DashPipe
  ],
  imports: [CommonModule, DataTableModule, AngularFormsUtilsModule],
  exports: [TableComponent, DashPipe]
})
export class AngularTableUtilsModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AngularTableUtilsModule
    };
  }

}