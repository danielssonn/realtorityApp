import { TestBed, inject } from '@angular/core/testing';

import { MockSessionService } from './mock-session.service';

describe('MockSessionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockSessionService]
    });
  });

  it('should be created', inject([MockSessionService], (service: MockSessionService) => {
    expect(service).toBeTruthy();
  }));
});
