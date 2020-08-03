import { TestBed, inject } from '@angular/core/testing';

import { EngagementService } from './engage.service';

describe('EngageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EngagementService]
    });
  });

  it('should be created', inject([EngagementService], (service: EngagementService) => {
    expect(service).toBeTruthy();
  }));
});
