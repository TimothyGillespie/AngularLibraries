import { NgModule } from '@angular/core';
import {
  StandardYouTubePlayerManagerService,
  YouTubePlayerManagerService,
} from './youtube-player/services/youtube-player-manager.service';
import {
  StandardYouTubeIFrameApiService,
  YouTubeIFrameApiService,
} from './youtube-player/services/youtube-iframe-api.service';
import { YouTubePlayerComponent } from './youtube-player/youtube-player.component';
import { YoutubePlayerOldCoreModule } from './youtube-player-core.module';

@NgModule({
  imports: [YoutubePlayerOldCoreModule],
  exports: [YouTubePlayerComponent],
  providers: [
    {
      provide: YouTubePlayerManagerService,
      useClass: StandardYouTubePlayerManagerService,
    },
    {
      provide: YouTubeIFrameApiService,
      useClass: StandardYouTubeIFrameApiService,
    },
  ],
})
export class YoutubePlayerOldStandardModule {}
