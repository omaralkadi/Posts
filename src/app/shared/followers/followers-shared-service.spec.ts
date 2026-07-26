import { TestBed } from '@angular/core/testing';

import { FollowersSharedService } from './followers-shared-service';

describe('FollowersSharedService', () => {
  let service: FollowersSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowersSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
