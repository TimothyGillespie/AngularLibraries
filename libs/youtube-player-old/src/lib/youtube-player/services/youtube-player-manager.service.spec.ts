import { TestBed } from '@angular/core/testing';

import { YouTubePlayerManagerService } from './youtube-player-manager.service';

describe('YoutubePlayerOldService', () => {
  let service: YouTubePlayerManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YouTubePlayerManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
