import { Injectable } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor() {}

  donutChart(values: any, tooltip: string = '') {
    return new Chart({
      chart: {
        type: 'pie',
      },
      title: {
        text: '',
        align: 'left',
      },
      subtitle: {
        text: '',
        align: 'left',
      },
      tooltip: {
        valueSuffix: ' (%)',
      },
      plotOptions: {
        pie: {
          innerSize: '70%',
          allowPointSelect: true,
          cursor: 'pointer',
          borderRadius: 8,
          dataLabels: {
            enabled: true,
            distance: -22,
            format: '{point.percentage:.0f}%',
            style: {
              fontSize: '0.9em',
            },
          },
        },
      },
      series: [
        {
          type: 'pie',
          name: '',
          data: values,
          events: {
            click: function (e) {
              // console.log('event', e);
            },
          },
        },
      ],
      credits: {
        enabled: false,
      },
    });
  }

  pieChart(values: any, tooltip: string = '') {
    return new Chart({
      chart: {
        type: 'pie',
      },
      title: {
        text: '',
        align: 'left',
      },
      subtitle: {
        text: '',
        align: 'left',
      },
      tooltip: {
        valueSuffix: ' (%)',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          borderRadius: 8,
          dataLabels: {
            enabled: true,
            distance: -22,
            format: '{point.percentage:.0f}%',
            style: {
              fontSize: '0.9em',
            },
          },
        },
      },
      series: [
        {
          type: 'pie',
          name: '',
          data: values,
          events: {
            click: function (e) {
              // console.log('event', e);
            },
          },
        },
      ],
      credits: {
        enabled: false,
      },
    });
  }

  columnChart(labels: string[], values: any, tooltip: string = '') {
    return new Chart({
      chart: {
        type: 'column',
      },
      title: {
        text: '',
        align: 'left',
      },
      subtitle: {
        text: '',
        align: 'left',
      },
      xAxis: {
        categories: labels,
        title: {
          text: null,
        },
      },
      yAxis: {
        min: 0,
        tickInterval: 20,
        title: {
          text: null,
        },
      },

      tooltip: {
        valueSuffix: tooltip,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      exporting: {},
      series: [
        {
          type: 'column',
          name: '',
          data: values,
        },
      ],
      credits: {
        enabled: false,
      },
    });
  }

  multipleColumnChart(labels: string[], values: any, tooltip: string = '') {
    return new Chart({
      chart: {
        type: 'column',
      },
      title: {
        text: '',
        align: 'left',
      },
      subtitle: {
        text: '',
        align: 'left',
      },
      xAxis: {
        categories: labels,
        title: {
          text: null,
        },
      },
      yAxis: {
        min: 0,
        tickInterval: 20,
        title: {
          text: null,
        },
      },

      tooltip: {
        valueSuffix: tooltip,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      exporting: {},
      series: values,
      credits: {
        enabled: false,
      },
    });
  }
}
