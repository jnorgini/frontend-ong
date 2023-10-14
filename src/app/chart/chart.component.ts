import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {


  // Resto do código permanece inalterado
  barData: any[] = [
    {
      name: 'Item 1',
      value: 10,
    },
    {
      name: 'Item 2',
      value: 20,
    },
    {
      name: 'Item 3',
      value: 15,
    },
    {
      name: 'Item 4',
      value: 30,
    },
    {
      name: 'Item 5',
      value: 25,
    },
  ];

  pieData: any[] = [
    {
      name: 'Categoria 1',
      value: 30,
    },
    {
      name: 'Categoria 2',
      value: 45,
    },
    {
      name: 'Categoria 3',
      value: 25,
    },
  ];

  scatterData: any[] = [
    {
      name: 'Grupo 1',
      series: [
        {
          name: 'Ponto 1',
          x: 10,
          y: 20,
          r: 5,
        },
        {
          name: 'Ponto 2',
          x: 15,
          y: 25,
          r: 8,
        },
      ],
    },
    {
      name: 'Grupo 2',
      series: [
        {
          name: 'Ponto 3',
          x: 30,
          y: 40,
          r: 12,
        },
      ],
    },
  ];

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal, // Use ScaleType.Ordinal here
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7AA3E5'],
  };
}