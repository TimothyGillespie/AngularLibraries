import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {YouTubePlayerComponent} from "../../../youtube-player/src/youtube-player.component";

@NgModule({
  imports: [CommonModule],
  exports: [YouTubePlayerComponent],
  declarations: [YouTubePlayerComponent],
})
export class YoutubePlayerCoreModule {}
