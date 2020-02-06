import { TestBed, inject } from '@angular/core/testing';

import { AgmLightForkService } from './agm-light-fork.service';

describe('AgmLightForkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgmLightForkService]
    });
  });

  it('should be created', inject([AgmLightForkService], (service: AgmLightForkService) => {
    expect(service).toBeTruthy();
  }));
});
