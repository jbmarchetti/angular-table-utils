import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularTableUtilsModule } from '../src';
import { DemoComponent } from './demo.component';

@NgModule({
  declarations: [DemoComponent],
  imports: [BrowserModule, AngularTableUtilsModule.forRoot()],
  bootstrap: [DemoComponent]
})
export class DemoModule { }