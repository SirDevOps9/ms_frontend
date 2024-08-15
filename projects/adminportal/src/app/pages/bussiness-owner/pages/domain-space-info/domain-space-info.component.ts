import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormConfig, FormTypes, SharedFormComponent, SharedLibModule } from 'shared-lib';
import { BussinessOwnerService } from '../../bussiness-owner.service';

@Component({
  selector: 'app-domain-space-info',
  templateUrl: './domain-space-info.component.html',
  styleUrl: './domain-space-info.component.scss',
  standalone: true,
  imports: [CommonModule, SharedLibModule],
})
export class DomainSpaceInfoComponent implements AfterViewInit {
  constructor(   private bussinessOwnerService : BussinessOwnerService,
    private route : ActivatedRoute){}
  @ViewChild('form') form: SharedFormComponent;
  fields: FormConfig[] = [
    {
      key: 'sudomainName',
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
      key: 'price',
      placeholder: 'Subscription Price',
      type: FormTypes.text,
      class: 'col-md-12',
      label: 'Subscription Price',
    },
    {
      key: 'purchasingPaymentPeriod',
      placeholder: 'Subscription Interval',
      type: FormTypes.text,
      class: 'col-md-12',
      label: 'Subscription Interval',
    },
    {
      key: 'isActive',
      placeholder: 'Subscription Status',
      type: FormTypes.text,
      class: 'col-md-12',
      label: 'Subscription Status',
    },
  ];
  id = this.route.snapshot.params['id']


  getSubDomainById() {
    this.bussinessOwnerService.getSubDomainById(this.id).subscribe(res=>{
      this.form.form.patchValue({...res})
      this.form.form.get('startDate')?.patchValue(new Date(res.startDate))
      this.form.form.get('endDate')?.patchValue(new Date(res.endDate))
      this.form.form.disable()

    })
  }




  ngAfterViewInit(): void {
    this.getSubDomainById()
  }

}
