export interface YouTubeIFrameApi {
  Player: YouTubePlayerConstructor;
}

export interface YouTubePlayerConstructor {
  new (elementId: string, config: YouTubeConfig): YouTubePlayer;
}

export interface VideoLoadingInfo {
  videoId: string;
  startSeconds: number | string;
  endSeconds: number | string;
}

export interface PlaylistLoadingInfo {
  listType: string;
  list: string;
  index?: number | string;
  startSeconds?: number | string;
}

interface YouTubeSphericalProperties {
  // [0, 360)
  yaw: number;
  // [-90,90]
  pitch: number;
  // [-180,180]
  roll: number;
  // [30,120]
  fov: number;
  enableOrientationSensor: boolean;
}

export interface YouTubePlayer {
  loadVideoById(
    videoId: string,
    startSeconds?: number | string,
    endSeconds?: number | string
  ): void;
  loadVideoById(data: VideoLoadingInfo): void;
  cueVideoById(
    videoId: string,
    startSeconds?: number | string,
    endSeconds?: number | string
  ): void;
  cueVideoById(data: VideoLoadingInfo): void;
  cueVideoByUrl(
    videoId: string,
    startSeconds?: number | string,
    endSeconds?: number | string
  ): void;
  cueVideoByUrl(data: VideoLoadingInfo): void;
  loadVideoByUrl(
    videoId: string,
    startSeconds?: number | string,
    endSeconds?: number | string
  ): void;
  loadVideoByUrl(data: VideoLoadingInfo): void;
  cuePlaylist(
    playlist: string | string[],
    index?: number | string,
    startSeconds?: number | string
  ): void;
  cuePlaylist(data: PlaylistLoadingInfo): void;
  loadPlaylist(
    playlist: string | string[],
    index?: number | string,
    startSeconds?: number | string
  ): void;
  loadPlaylist(data: PlaylistLoadingInfo): void;
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  seekTo(seconds: number | string, allowSeekAhead: boolean): void;
  getSphericalProperties(): Omit<
    YouTubeSphericalProperties,
    'enableOrientationSensor'
  >;
  setSphericalProperties(newProperties: YouTubeSphericalProperties): void;
  nextVideo(): void;
  previousVideo(): void;
  // Starts at 0
  playVideoAt(index: number): void;
  mute(): void;
  unMute(): void;
  isMuted(): void;
  // [0, 100]
  setVolume(newVolume: number): void;
  // [0, 100]
  getVolume(): number;
  getPlaybackRate(): number;
  setPlaybackRate(newPlaybackRate: number): number;
  getAvailablePlaybackRates(): number[];
  setSize(width: number | 'string', height: number | 'string'): void;
  setLoop(isLooping: boolean): void;
  setShuffle(isShuffling: boolean): void;
  getVideoLoadedFraction(): number;
  getPlayerState(): YouTubeNumericPlayerState;
  getDuration(): number;
  getVideoUrl(): string;
  getPlaylist(): string[];
  getPlaylistIndex(): number;
  addEventListener(event: string, listener: string): void;
  removeEventListener(event: string, listener: string): void;
  getIframe(): HTMLIFrameElement;
  destroy(): void;
}

export interface YouTubeConfig {
  height: number | string;
  width: number | string;
  videoId: string;
  host: string;
  playerVars?: PlayerVariables;
  events?: YoutubePlayerOldEvents;
}

export type YouTubePlayerColor = 'red' | 'white';
export type YouTubePlayerIVLoadPolicy = 1 | 3;
export type YouTubePlayerListType = 'playlist' | 'user_uploads';

// See https://developers.google.com/youtube/player_parameters
export interface IntermediateYouTubePlayerVariables {
  autoplay: NumericBoolean;
  cc_lang_pref: ISO6391TwoLetterLanguageCode | undefined;
  cc_load_policy: NumericBoolean;
  color: YouTubePlayerColor;
  controls: NumericBoolean;
  disablekb: NumericBoolean;
  enablejsapi: NumericBoolean;
  end: number | string;
  // Display fullscreen button
  fs: NumericBoolean;
  hl: ISO6391TwoLetterLanguageCode;
  iv_load_policy: YouTubePlayerIVLoadPolicy;
  list: string;
  listType: YouTubePlayerListType;
  loop: NumericBoolean;
  modestbranding: NumericBoolean;
  origin: string;
  playlist: string;
  playsinline: NumericBoolean;
  rel: NumericBoolean;
  start: number | string;
  widget_referrer: string;
}

export interface IntermediateYouTubePlayerEvents {
  onReady: (event: YouTubeEvent<undefined>) => void;
  onStateChange: (event: YouTubeEvent<YouTubeNumericPlayerState>) => void;
  onPlaybackQualityChange: (
    event: YouTubeEvent<YouTubePlayerQualitySetting>
  ) => void;
  onPlaybackRateChange: (event: YouTubeEvent<number>) => void;
  onError: (event: YouTubeEvent<YouTubeNumericPlayerError>) => void;
  onApiChange: (event: any) => void;
}

export type PlayerVariables = Partial<IntermediateYouTubePlayerVariables>;
export type YoutubePlayerOldEvents = Partial<IntermediateYouTubePlayerEvents>;

export type NumericBoolean = 0 | 1;

export type ISO6391TwoLetterLanguageCode = string & { length: 2 };

export interface YouTubeEvent<T> {
  data: T;
  target: any;
}

export type YouTubePlayerQualitySetting =
  | 'small'
  | 'medium'
  | 'large'
  | 'hd720'
  | 'hd1080'
  | 'highres';

export type YouTubeNumericPlayerState = -1 | 0 | 1 | 2 | 3 | 5;

export const YouTubePlayerState = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  VIDEO_CUED: 5,
};


export type YouTubeNumericPlayerError = 2 | 5 | 100 | 101 | 150;
