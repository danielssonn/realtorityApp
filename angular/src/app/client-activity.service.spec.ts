import { TestBed } from '@angular/core/testing';

import { ClientActivityService } from './client-activity.service';

describe('ClientActivityService', () => {
  let service: ClientActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
