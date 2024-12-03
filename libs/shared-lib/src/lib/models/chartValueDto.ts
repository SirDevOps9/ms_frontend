export interface ChartValueDto {
  y: number;
  value: number;
  color: string;
  name: string;
  quantity?: number | string;
}

// y the value which displayed in the chart
// value is the value which displayed in the tooltip or side data
