import { TestBed } from '@angular/core/testing';
import {StandardYouTubePlayerManagerService} from './youtube-player-manager.service';

describe('StandardYouTubePlayerManagerService', () => {
  let service: StandardYouTubePlayerManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardYouTubePlayerManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
