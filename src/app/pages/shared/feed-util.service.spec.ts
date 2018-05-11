import { TestBed, inject } from '@angular/core/testing';

import { FeedUtilService } from './feed-util.service';

describe('FeedUtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedUtilService]
    });
  });

  it('should be created', inject([FeedUtilService], (service: FeedUtilService) => {
    expect(service).toBeTruthy();
  }));
});
