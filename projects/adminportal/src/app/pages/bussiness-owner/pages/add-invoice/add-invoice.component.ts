import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BussinessOwnerService } from '../../bussiness-owner.service';
import { customValidators, FormsService } from 'shared-lib';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent {
  addForm: FormGroup;
  apps: any;
  lisences: any;
  BusinessOwner: any;
  invoiceApps: any[] = [];
  invoiceLicenses: any[] = [];
  totalPrice: number = 0;

  ngOnInit(): void {
    this.initializeForm();
    this.getBusinessOwnerLookup();
    this.getApps();
    this.getLisences();
  }

  getApps() {
    this.bussinessOwnerService.getApps().subscribe((res: any) => {
      this.apps = res;
    });
  }

  getLisences() {
    this.bussinessOwnerService.getLisences().subscribe((res: any) => {
      this.lisences = res;
    });
  }

  getBusinessOwnerLookup() {
    this.bussinessOwnerService.getBusinessOwnerLookup().subscribe((res: any) => {
      this.BusinessOwner = res;
    });
  }

  initializeForm() {
    this.addForm = this.formBuilder.group({
      businessOwnerId: new FormControl('', [customValidators.required]),
      email: new FormControl(''),
      phoneCode: new FormControl(''),
      phone: new FormControl(''),
      salesPerson: new FormControl(''),
      subDomainPrice: new FormControl(0),
      invoiceType: new FormControl('MainInvoice'),
      totalPrice: new FormControl(0),
      invoiceLicenses: this.formBuilder.array([]),
      invoiceApps: this.formBuilder.array([])
    });
  }

  createAppGroup() {
    return this.formBuilder.group({
      appId: new FormControl(''),
      appPrice: new FormControl(''),
      appCount: new FormControl(1)
    });
  }

  createLicenseGroup() {
    return this.formBuilder.group({
      licenseId: new FormControl(''),
      numberOfUsers: new FormControl(''),
      licensePrice: new FormControl(''),
      totalPrice: new FormControl('')
    });
  }

  setData(id: number) {
    const x: any = this.BusinessOwner.find((element: any) => element.id == id);
    this.addForm.get('email')?.setValue(x.email);
    this.addForm.get('phone')?.setValue(x.phone);
  }

  toggleAppSelection(event: any, item: any, index: number) {
    if (event.target.checked) {
      this.invoiceApps.push({
        appId: item.id,
        appPrice: item.price,
        appCount: 1
      });
      console.log(this.invoiceApps, "this.invoiceApps");

    } else {
      this.invoiceApps = this.invoiceApps.filter(app => app.appId !== item.id);
      console.log(this.invoiceApps, "this.invoiceApps");

    }
  }

  updateAppPrice(index: number, newPrice: number) {
    if (this.invoiceApps[index]) {
      this.invoiceApps[index].appPrice = newPrice;
    }
  }

  updateLicenseDetails(event: any, item: any, field: string) {
    if (!item) {
      console.error('Item is undefined or null');
      return;
    }

    const value = event;

    let license = this.invoiceLicenses.find(l => l.licenseId === item.id);
    if (!license) {
      license = {
        licenseId: item.id,
        numberOfUsers: 0,
        licensePrice: 0,
        totalPrice: 0
      };
      this.invoiceLicenses.push(license);

    }

    if (field === 'users') {
      license.numberOfUsers = value;
    } else if (field === 'price') {
      license.licensePrice = value;
    }


    license.totalPrice = license.numberOfUsers * license.licensePrice;

  }
  addInvoiceLicenseToForm(license: any) {
    const invoiceLicenseFormGroup = this.formBuilder.group({
      licenseId: new FormControl(license.licenseId),
      numberOfUsers: new FormControl(license.numberOfUsers),
      licensePrice: new FormControl(license.licensePrice),
      totalPrice: new FormControl(license.totalPrice)
    });

    (this.addForm.get('invoiceLicenses') as FormArray).push(invoiceLicenseFormGroup);
    this.calculateTotalPrice();

  }

  addInvoiceAppToForm(app: any) {
    const invoiceAppFormGroup = this.formBuilder.group({
      appId: new FormControl(app.appId),
      appPrice: new FormControl(app.appPrice),
      appCount: new FormControl(app.appCount)
    });

    (this.addForm.get('invoiceApps') as FormArray).push(invoiceAppFormGroup);
    this.calculateTotalPrice();

  }
  calculateTotalPrice() {
    this.totalPrice = 0;

    const apps = this.addForm.get('invoiceApps')?.value;
    apps.forEach((app: any) => {
      this.totalPrice += app.appPrice * app.appCount;
    });

    const licenses = this.addForm.get('invoiceLicenses')?.value;
    licenses.forEach((license: any) => {
      this.totalPrice += license.licensePrice * license.numberOfUsers;
    });

    this.addForm.get('totalPrice')?.setValue(this.totalPrice);
  }
  onSave() {
    this.invoiceLicenses.forEach(license => {
      this.addInvoiceLicenseToForm(license);
    });

    this.invoiceApps.forEach(app => {
      this.addInvoiceAppToForm(app);
    });

    console.log(this.addForm.value);
    if (!this.formsService.validForm(this.addForm, false)) return;
    this.bussinessOwnerService.addInvoice(this.addForm.value)

  }

  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private bussinessOwnerService: BussinessOwnerService
  ) { }

}
