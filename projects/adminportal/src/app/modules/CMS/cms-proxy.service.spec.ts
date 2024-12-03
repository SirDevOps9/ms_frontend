import { TestBed } from '@angular/core/testing';

import { CMSProxyService } from './cms-proxy.service';

describe('CMSProxyService', () => {
  let service: CMSProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CMSProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
