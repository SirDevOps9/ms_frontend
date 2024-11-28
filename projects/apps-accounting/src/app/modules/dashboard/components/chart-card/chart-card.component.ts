import { Component, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss',
})
export class ChartCardComponent {
  @Input() chartDTO!: Chart;
  @Input() chartDetailsConfig: any;

  ngOnInit() {}
}
