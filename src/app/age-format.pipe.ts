import { Pipe, PipeTransform } from '@angular/core';

const MONTHS_IN_A_YEAR = 12;

@Pipe({
  name: 'ageFormat'
})
export class AgeFormatPipe implements PipeTransform {
  transform(ageInMonths: number): string {

    return ageInMonths >= MONTHS_IN_A_YEAR
      ? `${Math.floor(ageInMonths / MONTHS_IN_A_YEAR)} ano(s)`
      : `${ageInMonths} mês(es)`;
  }
}
