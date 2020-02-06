import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText'
})
export class ShortTextPipe implements PipeTransform {

  transform(value: string, len: number): any {
    if (value) {
      if (value.length <= len) {
        return value;
      } else {
        return value.substring(0, len) + ' ...';

      }
    }
    return;
  }

}
