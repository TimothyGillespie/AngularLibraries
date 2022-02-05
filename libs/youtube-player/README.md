# @tgillespie/ngx-youtube-player

A component for embedding the YouTube Player and controlling it via the [YouTube iFrame API](https://developers.google.com/youtube/iframe_api_reference).

It makes the iFrame API and player instance available via services and the component attribute. Alternatively, the API and Player instances can be managed with custom services.

## Demo

The following demo does not reflect all capabilities of the component but should provide a quick glance. The component is much more powerful:

[Go to the Demo](https://timothygillespie.github.io/AngularLibraries/)

## Usage
Install the library
`npm install @tgillespie/ngx-youtube-player`

Import the library within your module with `YoutubePlayerModule.forRoot()`:

```
import {YouTubePlayerModule} from "@tgillespie/youtube-player";
@NgModule({
  ...
  imports: [
    YouTubePlayerModule.forRoot(),
    ...
  ],
  ...
})
export class AppModule {}
```

You can now use the component within your templates:

```
<g-youtube-player videoId="M7lc1UVf-VE"></g-youtube-player>
```

## Accessing the API

You can access the API via two methods:

### Direct Access on Component

Use a ViewChild (or any way to obtain the component instance) and access the wanted aspect (e.g., `player` or `stateChange`). The following example is a shortened version of the [Showcase](../../apps/showcase/src/app/demo/youtube-player-demo).

Typescript:

```
import {AfterViewInit, ViewChild} from '@angular/core';
import {YouTubePlayerComponent, YouTubePlayerState} from "@tgillespie/youtube-player";

@Component({
  selector: 'g-youtube-player-demo',
  templateUrl: './youtube-player-demo.component.html',
  styleUrls: ['./youtube-player-demo.component.scss'],
})
export class YouTubePlayerDemoComponent implements AfterViewInit {
  @ViewChild('youtubePlayer') youtubePlayer!: YouTubePlayerComponent;

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

```

Template:

```
<g-youtube-player
  videoId="M7lc1UVf-VE"
  #youtubePlayer
></g-youtube-player>
```


### Access via the YoutubePlayerManagerService

Inject the service and use it the same way as with the direct component access. 
You will need to give the player an ID or if no ID is given a random ID will be generated which you can fetch.
The addition of new entries entries will trigger the `newEntry` observer on the Service. 

Typescript

```
import {AfterViewInit, ViewChild} from '@angular/core';
import {YouTubePlayerComponent, YouTubePlayerState, YoutubePlayerManagerService} from "@tgillespie/youtube-player";

@Component({
  selector: 'g-youtube-player-demo',
  templateUrl: './youtube-player-demo.component.html',
  styleUrls: ['./youtube-player-demo.component.scss'],
})
export class YouTubePlayerDemoComponent implements AfterViewInit {

  private youtubePlayer: PlayerData | undefined = undefined;
  youtubePlayerId = 'my-unique-id';

  constructor(
    private youtubePlayerManagerService: YoutubePlayerManagerService,
  ) {}

  ngAfterViewInit() {
    this.youtubePlayer = this.youtubePlayerManagerService.get(this.youtubePlayerId);
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
```


Template

```
<g-youtube-player
  videoId="M7lc1UVf-VE"
  [id]="youtubePlayerId"
  #youtubePlayer
></g-youtube-player>
```

## Documentation

This library mostly just copies and forwards the iFrame API, adds some typing and converts some event aspects to observers. 
It also reloads the iFrame when the change would otherwise not be dynamically reflected.
No detailed documentation is provided. As a substitution please see:

- [Documentation of the YouTube iFrame API](https://developers.google.com/youtube/iframe_api_reference)
- [Source Code for the YoutubePlayerComponent](src/youtube-player/src/youtube-player.component.ts)
- [Source Code for the YoutubePlayerManagerService](src/services/src/youtube-player-manager.service.ts)
