import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageFormat'
})
export class AgeFormatPipe implements PipeTransform {
  transform(ageInMonths: number): string {
    const years = Math.floor(ageInMonths / 12);
    const months = ageInMonths % 12;

    if (years > 0 && months > 0) {
      return `${years} ano(s) e ${months} mês(es)`;
    } else if (years > 0) {
      return `${years} ano(s)`;
    } else {
      return `${months} mês(es)`;
    }
  }
}
