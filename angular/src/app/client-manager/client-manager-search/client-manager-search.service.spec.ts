import { TestBed, inject } from '@angular/core/testing';

import { ClientManagerSearchService } from './client-manager-search.service';

describe('ClientManagerSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientManagerSearchService]
    });
  });

  it('should be created', inject([ClientManagerSearchService], (service: ClientManagerSearchService) => {
    expect(service).toBeTruthy();
  }));
});
