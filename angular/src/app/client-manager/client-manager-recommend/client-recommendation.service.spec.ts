import { TestBed, inject } from '@angular/core/testing';

import { ClientRecommendationService } from './client-recommendation.service';

describe('ClientRecommendationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientRecommendationService]
    });
  });

  it('should be created', inject([ClientRecommendationService], (service: ClientRecommendationService) => {
    expect(service).toBeTruthy();
  }));
});
