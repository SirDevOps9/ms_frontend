import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { FormConfig, FormTypes, SharedFormComponent, SharedLibModule } from 'shared-lib';

@Component({
  selector: 'app-domain-space-info',
  templateUrl: './domain-space-info.component.html',
  styleUrl: './domain-space-info.component.scss',
  standalone: true,
  imports: [CommonModule, SharedLibModule],
})
export class DomainSpaceInfoComponent implements AfterViewInit {
  @ViewChild('form') form: SharedFormComponent;
  fields: FormConfig[] = [
    {
      key: 'feesAmount',
      placeholder: 'Domain Space',
      type: FormTypes.text,
      class: 'col-md-12',
      label: 'Domain Space',

    },
    {
      key: 'startDate',
      disabled: false,
      placeholder: 'Subscription Start Date',
      type: FormTypes.date,
      class: 'col-md-12',
      label: 'Subscription Start Date',
      options: {
        minDate: '',
        maxDate: '',
      },

    },
    {
      key: 'endDate',
      disabled: false,
      placeholder: 'Subscription End Date',
      type: FormTypes.date,
      class: 'col-md-12',
      label: 'Subscription End Date',
      options: {
        minDate: '',
        maxDate: '',
      },

    },
    {
      key: 'maximumAmount',
      placeholder: 'Subscription Price',
      type: FormTypes.text,
      class: 'col-md-12',
      label: 'Subscription Price',
    },
    {
      key: 'maximumAmount2',
      placeholder: 'Subscription Interval',
      type: FormTypes.text,
      class: 'col-md-12',
      label: 'Subscription Interval',
    },
    {
      key: 'maximumAmount3',
      placeholder: 'Subscription Status',
      type: FormTypes.text,
      class: 'col-md-12',
      label: 'Subscription Status',
    },
  ];




  ngAfterViewInit(): void {
    this.form.form.disable()
  }

}
