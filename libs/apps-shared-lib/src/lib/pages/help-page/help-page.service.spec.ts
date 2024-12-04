import { TestBed } from '@angular/core/testing';

import { HelpPageService } from './help-page.service';

describe('HelpPageService', () => {
  let service: HelpPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
