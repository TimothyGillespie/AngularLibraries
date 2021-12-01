import {Observable} from "rxjs";
import {
  YouTubeIFrameApi,
  YouTubeNumericPlayerError,
  YouTubeNumericPlayerState,
  YouTubePlayer,
  YouTubePlayerQualitySetting
} from "./youtube-api";

export abstract class YouTubeIFrameApiService {
  abstract api: YouTubeIFrameApi | undefined;
  abstract apiChange: Observable<YouTubeIFrameApi | undefined>;
}

export abstract class YouTubePlayerManagerService {
  abstract add(id: string, data: Omit<PlayerData, 'id'>): void;
  abstract delete(id: string): void;
  abstract get(id: string): PlayerData | undefined;
  abstract has(id: string): boolean;
  abstract newEntry: Observable<PlayerData>;
}

export interface PlayerData {
  id: string;
  player: YouTubePlayer;
  ready: Observable<void>;
  stateChange: Observable<YouTubeNumericPlayerState>;
  playbackQualityChange: Observable<YouTubePlayerQualitySetting>;
  playbackRateChange: Observable<number>;
  errorOccurrence: Observable<YouTubeNumericPlayerError>;
  apiChange: Observable<unknown>;
}
