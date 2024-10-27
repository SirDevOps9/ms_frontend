import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttributeDefinitionListComponent } from './attribute-definition-list.component';

import { of } from 'rxjs';
import { ItemsService } from '../../../items.service';
import { LanguageService, RouterService, ToasterService } from 'shared-lib';
import { SharedService } from '../services/shared-service.service';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { IAttrributeDifinitionResult } from '../../../models/AttrbuteDiffintion';
describe('AttributeDefinitionListComponent', () => {
  let component: AttributeDefinitionListComponent;
  let fixture: ComponentFixture<AttributeDefinitionListComponent>;
  let mockItemsService: jasmine.SpyObj<ItemsService>;
  let mockRouterService: jasmine.SpyObj<RouterService>;

  beforeEach(async () => {
    mockItemsService = jasmine.createSpyObj('ItemsService', ['getListOfAttr', 'listOfAttrDifinition$']);
    mockRouterService = jasmine.createSpyObj('RouterService', ['navigateTo']);

    await TestBed.configureTestingModule({
      declarations: [AttributeDefinitionListComponent],
      providers: [
        { provide: ItemsService, useValue: mockItemsService },
        { provide: RouterService, useValue: mockRouterService },
        { provide: ToasterService, useValue: {} },
        { provide: SharedService, useValue: {} },
        { provide: AuthService, useValue: {} },
        { provide: DialogService, useValue: {} },
        { provide: LanguageService, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AttributeDefinitionListComponent);
    component = fixture.componentInstance;
    mockItemsService.listOfAttrDifinition$ = of([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize data in ngOnInit', () => {
    spyOn(component, 'initTreasurData');
    component.ngOnInit();
    expect(component.initTreasurData).toHaveBeenCalled();
  });

  it('should fetch data in initTreasurData', () => {
    const mockData: IAttrributeDifinitionResult[] = [
      {
        id: 1, nameAr: 'Attribute1Ar', nameEn: 'Attribute1', isActive: true,
        itemAttributes: []
      } 
    ];
    mockItemsService.listOfAttrDifinition$ = of(mockData);

    component.initTreasurData();

    expect(component.tableData).toEqual(mockData);
    expect(mockItemsService.getListOfAttr).toHaveBeenCalledWith('', jasmine.any(Object));
  });



  it('should search and update tableData in onSearchChange', () => {
    const mockSearchResult: IAttrributeDifinitionResult[] = [
      {
        id: 2, nameAr: 'اسم', nameEn: 'SearchResult', isActive: true,
        itemAttributes: []
      } // add other required properties as per IAttrributeDifinitionResult
    ];
    mockItemsService.listOfAttrDifinition$ = of(mockSearchResult);
    component.searchTerm = 'Test';
    component.onSearchChange();

    expect(mockItemsService.getListOfAttr).toHaveBeenCalledWith('Test', jasmine.any(Object));
    expect(component.tableData).toEqual(mockSearchResult);
  });

}


)

