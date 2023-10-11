import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageFormat'
})
export class AgeFormatPipe implements PipeTransform {
  transform(ageInMonths: number): string {

    return ageInMonths >= 12
      ? `${Math.floor(ageInMonths / 12)} ano(s)`
      : `${ageInMonths} mês(es)`;
  }
}
