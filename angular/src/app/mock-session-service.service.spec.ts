import { TestBed, inject } from '@angular/core/testing';

import { MockSessionServiceService } from './mock-session-service.service';

describe('MockSessionServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockSessionServiceService]
    });
  });

  it('should be created', inject([MockSessionServiceService], (service: MockSessionServiceService) => {
    expect(service).toBeTruthy();
  }));
});
