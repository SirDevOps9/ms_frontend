import { Component, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ChartValueDto } from '../../models/chartValueDto';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss',
})
export class ChartCardComponent {
  @Input() chartDTO!: Chart;
  @Input() chartDetailsConfig: ChartValueDto[];
  @Input() smallSize: boolean = false;
  @Input() hideFooter: boolean = true;

  ngOnInit() {}
}
