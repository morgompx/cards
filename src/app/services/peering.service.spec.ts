import { TestBed } from '@angular/core/testing';

import { PeeringService } from './peering.service';

describe('PeeringService', () => {
  let service: PeeringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeeringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
