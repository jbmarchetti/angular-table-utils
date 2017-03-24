import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularTableUtilsModule } from '../src';
import { DemoComponent } from './demo.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@NgModule({
  declarations: [DemoComponent],
  imports: [TranslateModule.forRoot(), BrowserModule, AngularTableUtilsModule.forRoot()],
  bootstrap: [DemoComponent]
})
export class DemoModule { }