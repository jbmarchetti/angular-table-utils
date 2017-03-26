import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularTableUtilsModule } from '../src';
import { DemoComponent } from './demo.component';
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [DemoComponent],
  imports: [BrowserModule, AngularTableUtilsModule.forRoot(), TranslateModule.forRoot()],
  bootstrap: [DemoComponent]
})
export class DemoModule { }