import { NgModule } from '@angular/core';
import {YoutubePlayerCoreModule} from "../../core/src/youtube-player-core.module";
import {YouTubePlayerComponent} from "../../../youtube-player/src/youtube-player.component";
import {YouTubeIFrameApiService, YouTubePlayerManagerService} from "../../../interfaces/src/services";
import {StandardYouTubePlayerManagerService} from "../../../services/src/youtube-player-manager.service";
import {StandardYouTubeIFrameApiService} from "../../../services/src/youtube-iframe-api.service";

@NgModule({
  imports: [YoutubePlayerCoreModule],
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
export class YouTubePlayerStandardModule {}
