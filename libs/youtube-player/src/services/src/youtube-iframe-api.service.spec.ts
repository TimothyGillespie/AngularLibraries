import { TestBed } from '@angular/core/testing';
import {StandardYouTubeIFrameApiService} from './youtube-iframe-api.service';

describe('YoutubeIframeApiServiceService', () => {
  let service: StandardYouTubeIFrameApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardYouTubeIFrameApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
