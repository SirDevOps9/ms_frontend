import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { customValidators, LanguageService, ToasterService } from 'shared-lib';
import { ItemDto } from '../../models';
import { SalesService } from '../../sales.service';

@Component({
  selector: 'app-updete-price-policy',
  templateUrl: './updete-price-policy.component.html',
  styleUrl: './updete-price-policy.component.scss',

})
export class UpdetePricePolicyComponent {
  constructor(
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private salesService: SalesService,
    private languageService: LanguageService,
    private toasterService: ToasterService,
    private dialog: DialogService,


  ) {

  }
  addForm: FormGroup;
  policyItemsList: FormArray;
  data: any[] = [];
  priceListUpdate: any[] = [];
  items: ItemDto[] = [];
  filteredItems: any[] = []; // Filtered items to display in the table
  newPrice: number
  duplicateLine: boolean;
  rowDuplicate: number;
  categories: { id: any; nameAr: string; nameEn: string }[] = [];
  uoms: { id: any; nameAr: string; nameEn: string }[] = [];
  variants: { id: any; name: string }[] = [];
  isStorable: boolean = false;
  isService: boolean = false;
  ingredient!: string;

  ngOnInit() {
    this.initializeForm()
    this.data = this.config.data.value
    this.patchPolicyItems(this.data);
    this.listenToDropdownChanges()

  }
  initializeForm() {
    this.addForm = this.fb.group({
      code: new FormControl(''),
      category: new FormControl(''),
      uom: new FormControl(''),
      variant: new FormControl(''),
      search: new FormControl(''), // Search input field
      isStorable: new FormControl(false),
      isService: new FormControl(false),
      hasExpiryDate: new FormControl(false),
      price: new FormControl('fixed'),
      priceType: new FormControl('percent'),
      priceCount: new FormControl('minus'),
      policyItemsList: this.fb.array([]) // Initialize the FormArray
    });

    this.policyItemsList = this.addForm.get('policyItemsList') as FormArray;



  }
  patchPolicyItems(items: any[]) {
    this.policyItemsList.clear(); // Clear existing items, if any

    items.forEach((item) => {
      const group = this.fb.group({
        itemId: new FormControl(item.itemId || '', [customValidators.required]),
        itemName: new FormControl(item.itemName || ''),
        itemCode: new FormControl(item.itemCode || ''),
        isVatApplied: new FormControl(item.isVatApplied || false),
        uomId: new FormControl(item.uomId || ''),
        uomName: new FormControl(item.uomName || ''),
        itemVariantId: new FormControl(item.itemVariantId || ''),
        itemVariantName: new FormControl(item.itemVariantName || ''),
        price: new FormControl(item.price || 0, [customValidators.required]),
        priceWithVat: new FormControl(item.priceWithVat || 0),
        taxId: new FormControl(item.taxId || ''),
        taxRatio: new FormControl(item.taxRatio || ''),
        uomOptions: new FormControl(item.uomOptions || ''),
        itemCategoryNameAr: new FormControl(item.itemCategoryNameAr || ''),
        itemCategoryNameEn: new FormControl(item.itemCategoryNameEn || ''),
        hasExpiryDate: new FormControl(item.hasExpiryDate || ''),
        uomNameAr: new FormControl(item.uomNameAr || ''),
        uomNameEn: new FormControl(item.uomNameEn || ''),
        categoryType: new FormControl(item.categoryType || ''),
        name: new FormControl(item.name || ''),
        id: new FormControl(item.id)
      });

      this.policyItemsList.push(group);


    });
    this.filteredItems = [...this.policyItemsList.value]; // Initialize with all items

    this.createLists();

  }
  cancel() {
    this.ref.close()
  }

  createLists() {
    // Use Maps to ensure uniqueness by ID
    const categoryMap = new Map();
    const uomMap = new Map();
    const variantMap = new Map();

    this.policyItemsList.value.forEach((item: any) => {
      // Add unique categories
      if (!categoryMap.has(item.categoryType)) {
        categoryMap.set(item.categoryType, {
          id: item.categoryType,
          nameAr: item.itemCategoryNameAr || '',
          nameEn: item.itemCategoryNameEn || ''
        });
      }

      // Add unique UOMs
      if (!uomMap.has(item.uomId)) {
        uomMap.set(item.uomId, {
          id: item.uomId,
          nameAr: item.uomNameAr || '',
          nameEn: item.uomName || ''
        });
      }

      // Add unique variants
      if (!variantMap.has(item.itemVariantId)) {
        variantMap.set(item.itemVariantId, {
          id: item.itemVariantId,
          name: item.itemVariantName || ''
        });
      }
    });

    this.categories = Array.from(categoryMap.values());
    this.uoms = Array.from(uomMap.values());
    this.variants = Array.from(variantMap.values());
    console.log(this.uoms ,"this.uoms");
    
  }
  listenToDropdownChanges() {
    this.addForm.get('category')?.valueChanges.subscribe(() => this.filterTable());
    this.addForm.get('uom')?.valueChanges.subscribe(() => this.filterTable());
    this.addForm.get('variant')?.valueChanges.subscribe(() => this.filterTable());
    this.addForm.get('search')?.valueChanges.subscribe(() => this.filterTable()); // Listen for search input changes
    this.addForm.get('isStorable')?.valueChanges.subscribe(() => this.filterTable());
    this.addForm.get('isService')?.valueChanges.subscribe(() => this.filterTable());
    this.addForm.get('hasExpiryDate')?.valueChanges.subscribe(() => this.filterTable());
  }

  filterTable() {
    const category = this.addForm.get('category')?.value;
    const uom = this.addForm.get('uom')?.value;
    const variant = this.addForm.get('variant')?.value;
    const search = this.addForm.get('search')?.value.toLowerCase(); // Search term
    const isService = this.addForm.get('isService')?.value;
    const isStorable = this.addForm.get('isStorable')?.value;
    const hasExpiryDate = this.addForm.get('hasExpiryDate')?.value;
    this.filteredItems = this.policyItemsList.value.filter((item: any) => {

      const matchesCategory = category ? item.categoryType === category : true;
      const matchesUOM = uom ? item.uomId === uom : true;
      const matchesVariant = variant ? item.itemVariantId === variant : true;
      const matchesSearch = search
        ? item.itemCode.toLowerCase().includes(search)
        || item.itemName.toLowerCase().includes(search)
        || item.uomName.toLowerCase().includes(search)
        || item.itemVariantName.toLowerCase().includes(search)
        || item.itemCategoryNameEn.toLowerCase().includes(search)
        : true;
      const matchesStorable = isStorable ? item.categoryType === 'Storable' : true;
      const matchesService = isService ? item.categoryType === 'Service' : true;
      const matchesExpiry = hasExpiryDate ? item.hasExpiryDate === true : true;

      return (
        matchesCategory &&
        matchesUOM &&
        matchesVariant &&
        matchesSearch &&
        matchesStorable &&
        matchesService &&
        matchesExpiry
      );

    });
  }
  test(e: any) {
    this.newPrice = e
  }
  updatePrice(e: any) {

    const price = this.addForm.get('price')?.value;
    const priceType = this.addForm.get('priceType')?.value;
    const priceCount = this.addForm.get('priceCount')?.value;

    if (this.priceListUpdate.length === 0) {
      this.toasterService.showError(
        this.languageService.transalte('addCustomerDefinition.success'),
        this.languageService.transalte('openeingBalance.CustomerAdded')
      ); return;
    }

    this.priceListUpdate.forEach((updatedItem: any) => {
      const index = this.policyItemsList.controls.findIndex(
        (control) => control.get('id')?.value === updatedItem.id
      );

      if (index !== -1) {
        const control = this.policyItemsList.at(index);
        const originalPrice = updatedItem.price; // Use original price for calculations

        if (price == 'fixed') {
          control.get('price')?.setValue(e);
        } else if (price == 'calculation') {
          if (priceType == 'amount') {
            if (priceCount == 'plus') {
              const newPrice = Number(originalPrice) + Number(e);
              control.get('price')?.setValue(newPrice);
            } else if (priceCount == 'minus') {
              const newPrice = Number(originalPrice) - Number(e);
              control.get('price')?.setValue(newPrice);
            }
          } else if (priceType == 'percent') {
            if (priceCount == 'plus') {
              const newPrice = Number(originalPrice) + (Number(originalPrice) * Number(e)) / 100;
              control.get('price')?.setValue(newPrice);
            } else if (priceCount == 'minus') {
              const newPrice = Number(originalPrice) - (Number(originalPrice) * Number(e)) / 100;
              control.get('price')?.setValue(newPrice);
            }
          }
        }
      }
    });

    this.toasterService.showSuccess(
      this.languageService.transalte('messages.success'),
      this.languageService.transalte('messages.successfully')
    );

  }

  onSelectedRowsChange(e: any) {
    this.priceListUpdate = e
  }
  save() {
    if (this.priceListUpdate.length > 0) {
      if (this.newPrice != 0 && this.newPrice != undefined) {
        this.updatePrice(this.newPrice)
        this.ref.close(this.policyItemsList)

      } else {
        this.toasterService.showError(
          this.languageService.transalte('messages.error'),
          this.languageService.transalte('messages.priceRequired')
        );
      }
    } else {
      this.toasterService.showError(
        this.languageService.transalte('messages.error'),
        this.languageService.transalte('messages.noItemSelected')
      );

    }
  }
}
