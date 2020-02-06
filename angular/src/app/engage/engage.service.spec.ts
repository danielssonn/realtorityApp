import { TestBed, inject } from '@angular/core/testing';

import { EngageService } from './engage.service';

describe('EngageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EngageService]
    });
  });

  it('should be created', inject([EngageService], (service: EngageService) => {
    expect(service).toBeTruthy();
  }));
});
