import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'twDash'
})
export class DashPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return value || '-';
    }
}
