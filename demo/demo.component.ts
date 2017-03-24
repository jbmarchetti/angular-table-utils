import { Component } from '@angular/core';
@Component({
  selector: 'tw-demo-app',
  template: '<h1>Table</h1><tw-table *ngIf=\'items\' [options]=\'tableOptions\' [items]=\'items\' [fields]=\'fields\' (action)=\'actionCallBack($event)\'></tw-table>'
})
export class DemoComponent {

  items: any[] =
  [
    { id: 1, name: 'JB', active: true },
    { id: 2, name: 'Bib', active: true },
    { id: 3, name: 'Alex', active: false },
    { id: 4, name: 'Carlu', active: true },
  ]

  tableOptions: any =
  {
    title: 'My list',
    csv: { label: 'CSV Export', title: 'Components csv' },
    create: { label: 'Create a new component' },
    // translate: { key: '' }
  }

  fields: any[] =
  [
    { field: 'id', text: true, label: 'Id' },
    { field: 'name', text: true, label: 'Name' },
    { field: 'active', boolean: true, label: 'Active' }
  ]

  actionCallBack($event: any): void {
    alert($event)
  }
}
