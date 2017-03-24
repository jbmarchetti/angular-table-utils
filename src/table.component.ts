import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tw-table',
  template: `
    <div class="card">
      <div class="card-header">
        <strong  *ngIf='options.title'>{{options.title}}</strong>
        <button *ngIf='options.csv' class='btn btn-sm btn-success pull-right' (click)='exportToCSV()'><i class='fa fa-file-excel-o'> {{options.csv.label}}</i></button>
        <button *ngIf='options.create' class='btn btn-sm btn-success pull-right' (click)='onAction(null, "create")'><i class='fa fa-plus'> {{options.create.label}}</i></button>
      </div>
      <div class="card-block scroll-x">
        <table class="table table-striped table-bordered tickets-list table-responsive" [mfData]="items" #mf="mfDataTable" [mfRowsOnPage]="20">
          <thead>
            <tr>
              <th *ngFor='let field of fields'>
                <mfDefaultSorter by="{{field.field}}" *ngIf='field.field'>{{field.field}}</mfDefaultSorter>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of mf.data;let i = index">
              <td *ngFor='let field of fields' [ngClass]="field.class">
                <span *ngIf='field.tag' class="tag tag-info" [ngClass]="item[field.field]">{{item[field.field]}}</span>
                <span *ngIf='field.boolean' class="tag" [ngClass]="item[field.field] ? 'tag-success' : 'tag-danger'"><i class='fa' [ngClass]="item[field.field] ? 'fa-thumbs-up' : 'fa-thumbs-down'"></i></span>
                <span *ngIf='field.text'>{{item[field.field] | twDash}}</span>

                <div *ngFor='let action of field.actions'>
                  <button *ngIf='action.type==="button" && showWithConditions(action, item[action.condition])' class='btn btn-{{action.class}} btn-sm'
                    (click)='onAction(i, action.action, item)'><i class="fa fa-{{action.icon}}"></i> 
                    {{action.text}}
                    </button>
                  <span *ngIf='action.type==="text"  && showWithConditions(action, item[action.condition])'>
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
    </div>`
})
export class TableComponent {

  @Input() items: any
  @Input() fields: any[]
  @Input() options: any

  @Output() action: EventEmitter<any> = new EventEmitter<string>(true)

  public EOL: string = '\r\n';
  public BOM: string = '\ufeff';
  public DEFAULT_FIELD_SEPARATOR: string = ';';


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
  showWithConditions(action: any, itemValue: any): boolean {
    if (
      (action.condition && itemValue === action.conditionValue)
      || !action.condition
      || (action.nConditionValue && (action.condition && itemValue !== action.nConditionValue))
    )
      return true

    return false
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
          row.push(item[field.field])
      })
      rows.push(row.join(this.DEFAULT_FIELD_SEPARATOR))
    })
    return rows.join(this.EOL)
  }




}
