import { TestBed } from '@angular/core/testing';

import { PostsSharedService } from './posts-shared-service';

describe('PostsSharedService', () => {
  let service: PostsSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
