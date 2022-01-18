import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {YouTubePlayerComponent, YouTubePlayerState} from "@tgillespie/youtube-player";

@Component({
  selector: 'tgillespie-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('youtubePlayer') youtubePlayer?: YouTubePlayerComponent;

  isPlaying = false;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.youtubePlayer?.stateChange.subscribe((newState) => {
      // We could check for equality to PLAYING state but this feels more responsive, since there is a delay when buffering
      this.isPlaying = newState !== YouTubePlayerState.PAUSED;
      this.cd.detectChanges();
    });

  }

  togglePlayingState() {
    if(this.isPlaying) {
      this.youtubePlayer?.player?.pauseVideo();
    } else {
      this.youtubePlayer?.player?.playVideo();
    }
  }

}
