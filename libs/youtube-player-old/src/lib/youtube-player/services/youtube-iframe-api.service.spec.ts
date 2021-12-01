import { TestBed } from '@angular/core/testing';

import { YouTubeIFrameApiService } from './youtube-iframe-api.service';

describe('YoutubeIframeApiServiceService', () => {
  let service: YouTubeIFrameApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YouTubeIFrameApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
