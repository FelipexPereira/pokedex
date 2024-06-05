import { TestBed } from '@angular/core/testing';

import { ApipokeService } from './apipoke.service';

describe('ApipokeService', () => {
  let service: ApipokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApipokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
