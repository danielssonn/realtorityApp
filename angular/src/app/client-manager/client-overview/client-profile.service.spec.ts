import { TestBed, inject } from '@angular/core/testing';

import { ClientProfileService } from './client-profile.service';

describe('ClientProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientProfileService]
    });
  });

  it('should be created', inject([ClientProfileService], (service: ClientProfileService) => {
    expect(service).toBeTruthy();
  }));
});
