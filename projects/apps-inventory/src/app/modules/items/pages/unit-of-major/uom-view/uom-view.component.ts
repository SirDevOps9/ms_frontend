import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterService, LanguageService, PageInfoResult } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { UOMType } from '../../../models/enums';
import { debounceTime, Subject } from 'rxjs';
import { UonViewDto } from '../../../models/UomViewDto';

@Component({
  selector: 'app-uom-view',
  templateUrl: './uom-view.component.html',
  styleUrls: ['./uom-view.component.scss'],
})
export class UomViewComponent {
  currentPageInfo: PageInfoResult = {};
  id: number = 0;
  uomsDataObject: any = {};
  uomsData: any[] = [];
  currentLang: string = '';
  searchSubject = new Subject<string>();
  constructor(
    private _itemService: ItemsService,
    private routerService: RouterService,
    private route: ActivatedRoute,
    private languageService: LanguageService
  ) {
    this.currentLang = this.languageService.getLang();
    this.id = this.route.snapshot.params['id'];
  }
  get systemUnitIdAsString(): string {
    return this.uomsData[0]?.systemUnitOfMeasureCategoryId?.toString() || '';
  }
  ngOnInit(): void {

    this.getUomById();

    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.filterTable(searchValue);
    });
  }

  getUomById() {
    this._itemService.getUOMCategoryById(this.id);
    this._itemService.getUOMCategoryByIdData$.subscribe((res: any) => {
      if (res) {
        this.uomsDataObject = res;
        this.uomsData = res.uoMs || [];
        this.transformUomData();
      }
    });
  }

  transformUomData() {
    if (this.uomsData && Array.isArray(this.uomsData)) {
      this.uomsData.map(item => {
      });
    } else {
    }
  }


  onSearch(value: any): void {
    this.searchSubject.next(value.value);
  }

  filterTable(value: any) {
    if (!value) {
      this.uomsData = [...this.uomsDataObject.uoMs];
      return;
    }

    const lowerCaseValue = value.toLowerCase();

    this.uomsData = this.uomsDataObject.uoMs.filter((elem: any) =>
      Object.values(elem).some((field) =>
        field?.toString().toLowerCase().includes(lowerCaseValue)
      )
    );
  }
}
