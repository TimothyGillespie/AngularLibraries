import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {YouTubePlayerComponent, YouTubePlayerState} from "@tgillespie/youtube-player";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSliderChange} from "@angular/material/slider";
import {pairwise} from "rxjs";

@Component({
  selector: 'g-youtube-player-demo',
  templateUrl: './youtube-player-demo.component.html',
  styleUrls: ['./youtube-player-demo.component.scss'],
})
export class YouTubePlayerDemoComponent implements OnInit, AfterViewInit {
  @ViewChild('youtubePlayer') youtubePlayer!: YouTubePlayerComponent;


  formGroup: FormGroup;
  isPlaying = false;

  width = 640;
  height = 390;

  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {
    this.formGroup = this.fb.group({
      width: this.fb.control(640),
      height: this.fb.control(390),
    });
  }



  ngOnInit() {
    this.formGroup.valueChanges.subscribe(([prev, next]) => {
    });
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

  // Not included in form because this way it responds to change more directly (not only after letting the control go)
  // when binding it to input and not to change
  setValue($event: MatSliderChange) {
    this.youtubePlayer?.player?.setVolume($event.value ?? 0);
  }
}
