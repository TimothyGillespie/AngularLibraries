import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YouTubePlayerComponent } from './youtube-player/youtube-player.component';

@NgModule({
  imports: [CommonModule],
  exports: [YouTubePlayerComponent],
  declarations: [YouTubePlayerComponent],
})
export class YoutubePlayerOldCoreModule {}
