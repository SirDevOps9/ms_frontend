import { TestBed } from "@angular/core/testing";
import { ItemsService } from "./items.service";
import { PageInfo, PaginationVm, SharedLibModule } from "shared-lib";
import { ItemsProxyService } from "./items-proxy.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from "@angular/router";
import { of } from 'rxjs'; // Importing 'of' to mock observables
import { ItemsModule } from "./items.module";
import { TranslateModule } from '@ngx-translate/core'; // Import TranslateModule
import { itemDefinitionDto } from "./models";

// Mock ActivatedRoute
class MockActivatedRoute {
    params = of({}); // Replace with your desired route params if necessary
}

describe('ItemsService', () => {
    let service: ItemsService;
    let httpTestController: HttpTestingController;
   let  itemsProxyService :ItemsProxyService
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                SharedLibModule,
                ItemsModule,
                TranslateModule.forRoot() // Add TranslateModule here
            ],
            providers: [
                ItemsService,
                ItemsProxyService,
                { provide: ActivatedRoute, useClass: MockActivatedRoute } // Providing the mock class
            ]
        });
        service = TestBed.inject(ItemsService);
        httpTestController = TestBed.inject(HttpTestingController);
        itemsProxyService = TestBed.inject(ItemsProxyService);
        
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get item definition', () => {
        const mockPageInfo = new PageInfo(1, 25); // Page 1 with 25 items
        const searchTerm = 'okkkkk'; // Empty search term
      
        // Mock response object
        const mockResponse: PaginationVm<itemDefinitionDto> = {
          pageInfoResult: {
            currentPage: 1,
            pageSize: 0,
            totalItems: 2
          },
          orderBy: 'name',
          orderByDesc: false,
          result: [] // Empty result, could add mock data here
        };
      
        // Make the call
        itemsProxyService.getItemDefinition(searchTerm, mockPageInfo).subscribe((data: PaginationVm<itemDefinitionDto>) => {
          expect(data).toBeTruthy(); // Expect data to be returned
          expect(data.pageInfoResult.totalItems).toEqual(2); // Check total items
          expect(data.pageInfoResult.pageSize).toEqual(0); // Check total items
          expect(data.pageInfoResult.currentPage).toEqual(1); // Check total items
          
        });
      
        // Capture the request
        const req = httpTestController.expectOne(request => 
          request.method === 'GET' && request.url.includes('Item')
        );
             expect(req.request.params.get('SearchTerm')).toBe(null); // Since the search term is empty

        // Check the query parameters sent in the request
        // expect(req.request.params.get('currentPage')).toEqual('1');
        // expect(req.request.params.get('PageSize')).toEqual('25');
        // expect(req.request.params.has('SearchTerm')).toBeFalse(); // Since the search term is empty
      
        // Respond with the mock data
        req.flush(mockResponse);
      });
      

    afterEach(() => {
        httpTestController.verify(); 
    });
});
