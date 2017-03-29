import { AfterViewInit, OnChanges, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { FormField } from 'angular-forms-utils'

@Component({
  selector: 'tw-table',
  template: `
    <div class="card">
      <div class="card-header">
        <strong *ngIf='options.title' >{{options.title}}</strong>
        <button *ngIf='options.create' class='btn btn-success pull-right' (click)='onAction(null, "create")'><i class='fa fa-plus'> {{options.create.label}}</i></button>
      </div>
      <div class="card-block scroll-x">
      <strong *ngIf='options.filters' >Filtres</strong>
      <tw-reactive-form *ngIf='options.filters' [fields]='options.filters' [form]='form' [request]='filtersModel'></tw-reactive-form>
        <table class="table table-striped table-bordered tickets-list table-responsive" [mfData]="displayedItems" #mf="mfDataTable" [mfRowsOnPage]="20">
          <thead>
            <tr>
              <th *ngFor='let field of fields'>
                <mfDefaultSorter by="{{field.field}}" *ngIf='field.field'>{{field.label || field.field}}</mfDefaultSorter>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of mf.data;let i = index">
              <td *ngFor='let field of fields' [ngClass]="field.class">
                <span *ngIf='field.tag' class="tag tag-info" [ngClass]="getValue(item, field.field)">{{getValue(item, field.field)}}</span>
                <span *ngIf='field.boolean' class="tag" [ngClass]="getValue(item, field.field) ? 'tag-success' : 'tag-danger'"><i class='fa' [ngClass]="getValue(item, field.field) ? 'fa-thumbs-up' : 'fa-thumbs-down'"></i></span>
                <span *ngIf='field.text'>{{getValue(item, field.field) | twDash}}</span>

                <div *ngFor='let action of field.actions'>
                  <button *ngIf='action.type==="button" && showWithConditions(action, item)' class='btn btn-{{action.class}} btn-sm'
                    (click)='onAction(i, action.action, item)'><i class="fa fa-{{action.icon}}"></i> 
                    {{action.text}}
                    </button>
                  <span *ngIf='action.type==="text"  && showWithConditions(action, item)'>
                    {{action.text}}
                    </span>
                </div>
                <div *ngIf='field.list'>
                  <span *ngFor='let l of item[field.list];let j = index' (click)='onAction(j, field.action, item, l)' [ngClass]='l[field.classAttr]'
                    class='{{field.classLi}}'></span>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="6">
                <mfBootstrapPaginator [rowsOnPageSet]="[5,10,25]"></mfBootstrapPaginator>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class='card-footer'>
            <button *ngIf='options.csv' class='btn btn-primary ' (click)='exportToCSV()'><i class='fa fa-file-excel-o'> {{options.csv.label}}</i></button>
      </div>
    </div>`
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() items: any
  @Input() fields: any[]
  @Input() options: any

  @Output() action: EventEmitter<any> = new EventEmitter<string>(true)

  public EOL: string = '\r\n';
  public BOM: string = '\ufeff';
  public DEFAULT_FIELD_SEPARATOR: string = ';';

  public form: FormGroup = new FormGroup({});
  public filtersModel: any = {}

  public filters: any[] = []
  public keyword: string

  public displayedItems: any


  getValue(item: any, fieldId: string): string {
    let value: any = item
    if (fieldId) {
      let split: string[] = fieldId.split('.')
      split.forEach((v: string) => value = value[v])
      return value
    }
    return ''
  }

  ngOnInit(): void {
    this.displayedItems = this.items
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.displayedItems = changes['items'].currentValue
  }

  ngAfterViewInit(): void {
    if (this.options.filters) {
      this.options.filters.forEach((filter: FormField) => {
        if (filter.type === 'select' && !filter.options)
          filter.options = this.items
        filter.control.valueChanges.subscribe((value: any) => {
          this.updateFilters(filter.id, value)
        })
      })
    }
  }


  public updateFilters(filter: string, values?: any[]): void {
    this.filters[filter] = values
    this.search()
  }


  public search(): void {

    this.displayedItems = this.items.filter((data: any) => {
      /*FILTERS*/
      if (this.options.filters)
        for (var i in this.filters) {
          if (!(new RegExp('(' + this.filters[i] + ')', 'i').test(data[i].toString()) || !this.filters[i] || this.filters[i].toString() === ''))
            return false
        }

      /*FULL TEXT*/
      if (this.options.fulltext)
        for (var j in this.options.fulltext) {
          let test: string = data[this.options.fulltext[j]] ? data[this.options.fulltext[j]].toString() : ''
          if (!(new RegExp(this.keyword, 'i')).test(test))
            return false
        }

      return true
    })

  }


  onAction(index: number, type: string, item: any = null, subItem: any = null): void {
    this.action.next(
      {
        index: index,
        type: type,
        item: item,
        subItem: subItem
      }
    )
  }

  showWithConditions(action: any, item: any): boolean {
    let good: boolean = true

    if (action.conditions) {
      action.conditions.forEach((cond: any) => {
        if (cond.conditionValue && this.getValue(item, cond.condition) != cond.conditionValue)
          good = false

        if (cond.nConditionValue && this.getValue(item, cond.condition) == cond.nConditionValue)
          good = false
      })
    }

    return good
  }
  exportToCSV(): void {

    let csv: string

    csv = this.getCSVHeaders() + this.EOL
    csv += this.getCSVBody()

    if (csv === '') {
      console.log('Invalid data');
      return;
    }

    // Read blob.
    let blob: any = new Blob([csv], { type: 'text/csv;charset=UTF-8' })
    let url: any = window.URL.createObjectURL(blob);
    let a: any = document.createElement('a');
    document.body.appendChild(a);
    // a.style = 'display: none';
    a.href = url;
    a.download = this.options.csv.title.replace(/ /g, '_') + '.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
	/**
	 * Create Headers
	 */
  private getCSVHeaders(): string {
    let row: string[] = []
    this.fields.forEach((field: any) => {
      if (!field.actions)
        row.push(field.field)
    })
    return row.join(this.DEFAULT_FIELD_SEPARATOR)
  }
  /**
   * Create Body
   */
  private getCSVBody(): string {
    let rows: string[] = []
    this.items.forEach((item: any) => {
      let row: string[] = []
      this.fields.forEach((field: any) => {
        if (!field.actions)
          row.push(this.getValue(item, field.field))
      })
      rows.push(row.join(this.DEFAULT_FIELD_SEPARATOR))
    })
    return rows.join(this.EOL)
  }




}
