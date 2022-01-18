import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {YouTubePlayerComponent} from "../../youtube-player/src/youtube-player.component";
import {YouTubeIFrameApiService, YouTubePlayerManagerService} from "../../interfaces/src/services";
import {StandardYouTubePlayerManagerService} from "../../services/src/youtube-player-manager.service";
import {StandardYouTubeIFrameApiService} from "../../services/src/youtube-iframe-api.service";

@NgModule({
  imports: [CommonModule],
  declarations: [YouTubePlayerComponent],
  exports: [YouTubePlayerComponent],
})
export class YouTubePlayerModule {

  static forRoot(): ModuleWithProviders<YouTubePlayerModule> {
    return {
      ngModule: YouTubePlayerModule,
      providers: [{
          provide: YouTubePlayerManagerService,
          useClass: StandardYouTubePlayerManagerService,
        },
        {
          provide: YouTubeIFrameApiService,
          useClass: StandardYouTubeIFrameApiService,
        },
      ]
    }
  }
}
