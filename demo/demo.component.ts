import { Component } from '@angular/core';
import { FormField, IFormField } from 'angular-forms-utils'

@Component({
  selector: 'tw-demo-app',
  template: '<h1>Table</h1><tw-table *ngIf=\'items\' [options]=\'tableOptions\' [items]=\'items\' [fields]=\'fields\' (action)=\'actionCallBack($event)\'></tw-table>'
})
export class DemoComponent {

  items: any[] =
  [
    { id: 1, name: 'JB', active: true, address: { zip: 20000 } },
    { id: 2, name: 'Bib', active: true, address: { zip: 20000 } },
    { id: 3, name: 'Alex', active: false, address: { zip: 10000 } },
    { id: 4, name: 'Carlu', active: true, address: { zip: 30000 } },
  ]

  tableOptions: any =
  {
    title: 'My list',
    csv: { label: 'CSV Export', title: 'Components csv' },
    create: { label: 'Create a new component' },
    filters: [
      new FormField(<IFormField>{ id: 'name', type: 'text' }),
      new FormField(<IFormField>{ id: 'id', type: 'select', label: 'Name filter', options: [false], optionText: 'name', optionValue: 'id', firstValue: { text: 'Tous' } }),
      new FormField(<IFormField>{ id: 'active', type: 'boolean', label: 'Active filter' }),
      // new FormField(<IFormField>{ id: 'name', type: 'select', label: 'Input Number' }),
      // new FormField(<IFormField>{ id: 'email', type: 'email', label: 'Input Email' })
    ]
    // translate: { key: '' }
  }



  fields: any[] =
  [
    { field: 'id', text: true, label: 'Id' },
    { field: 'name', text: true, label: 'Name' },
    { field: 'active', boolean: true, label: 'Active' },
    { field: 'address.zip', text: true, label: 'Zip' }
  ]

  actionCallBack($event: any): void {
    alert($event)
  }
}
