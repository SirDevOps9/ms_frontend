import { TestBed } from '@angular/core/testing';

import { AppsSharedLibService } from './apps-shared-lib.service';

describe('AppsSharedLibService', () => {
  let service: AppsSharedLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppsSharedLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
