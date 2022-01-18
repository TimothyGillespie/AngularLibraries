import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { v4 } from 'uuid';
import {
  ISO6391TwoLetterLanguageCode,
  NumericBoolean, YouTubeConfig, YouTubeIFrameApi,
  YouTubeNumericPlayerError,
  YouTubeNumericPlayerState, YouTubePlayer, YouTubePlayerColor, YouTubePlayerIVLoadPolicy, YouTubePlayerListType,
  YouTubePlayerQualitySetting
} from '../../interfaces/src/youtube-api';
import {YouTubeIFrameApiService, YouTubePlayerManagerService} from "../../interfaces/src/services";

const booleanToNumericBoolean = (
  inputBoolean: boolean | undefined
): NumericBoolean | undefined => {
  if (inputBoolean === undefined) return undefined;

  return inputBoolean ? 1 : 0;
};

@Component({
  selector: 'g-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss'],
})
export class YouTubePlayerComponent implements OnInit, OnDestroy {
  protected htmlIdPrefix = 'ytPlayer-';
  protected privateHost = 'https://www.youtube-nocookie.com';
  protected nonPrivateHost = 'https://www.youtube.com';

  protected subscriptions: Subscription[] = [];

  // IFrame API
  @Output() ready = new EventEmitter<void>();
  @Output() stateChange = new EventEmitter<YouTubeNumericPlayerState>();
  @Output() playbackQualityChange =
    new EventEmitter<YouTubePlayerQualitySetting>();
  @Output() errorOccurrence = new EventEmitter<YouTubeNumericPlayerError>();
  @Output() playbackRateChange = new EventEmitter<number>();
  @Output() apiChange = new EventEmitter<unknown>();

  // Library
  @Output() playerChange = new EventEmitter<YouTubePlayer>();

  protected _id = new BehaviorSubject<string>(v4());
  protected _width = 640;
  protected _height = 390;
  protected _videoId!: string;
  protected _player = new BehaviorSubject<undefined | YouTubePlayer>(undefined);

  protected _autoplay = false;
  protected _ccLangPref: ISO6391TwoLetterLanguageCode | undefined = undefined;
  protected _ccLoadPolicy = false;
  protected _color: YouTubePlayerColor = 'red';
  protected _controls = true;
  protected _disablekb = false;
  protected _enablejsapi = false;
  protected _end: number | undefined;
  protected _fs = true;
  protected _hl: ISO6391TwoLetterLanguageCode | undefined = undefined;
  protected _ivLoadPolicy: YouTubePlayerIVLoadPolicy = 1;
  protected _list: string | undefined = undefined;
  protected _listType: YouTubePlayerListType | undefined = undefined;
  protected _loop = false;
  protected _modestbranding = false;
  protected _origin: string | undefined = undefined;
  protected _playlist: string | undefined = undefined;
  protected _playsinline: boolean | undefined = undefined;
  protected _rel = false;
  _start = 0;
  protected _widgetReferrer: string | undefined = undefined;

  @Input()
  get autoplay(): boolean {
    return this._autoplay;
  }

  set autoplay(newAutoPlay) {
    this._autoplay = newAutoPlay;
    this.setupPlayerWithCurrentSetting();
  }

  @Input()
  get ccLangPref(): ISO6391TwoLetterLanguageCode | undefined {
    return this._ccLangPref;
  }

  set ccLangPref(newCcLangPref) {
    this._ccLangPref = newCcLangPref;
    this.setupPlayerWithCurrentSetting();
  }

  @Input()
  get ccLoadPolicy(): boolean {
    return this._ccLoadPolicy;
  }

  set ccLoadPolicy(newCcLoadPolicy) {
    this._ccLoadPolicy = newCcLoadPolicy;
    this.setupPlayerWithCurrentSetting();
  }

  @Input()
  get color(): YouTubePlayerColor {
    return this._color;
  }

  set color(newColor) {
    this._color = newColor;
    this.setupPlayerWithCurrentSetting();
  }

  @Input()
  get controls(): boolean {
    return this._controls;
  }

  set controls(newControls) {
    this._controls = newControls;
    this.setupPlayerWithCurrentSetting();
  }

  @Input()
  get disablekb(): boolean {
    return this._disablekb;
  }

  set disablekb(newDisablekb) {
    this._disablekb = newDisablekb;
    this.setupPlayerWithCurrentSetting();
  }

  @Input()
  get enablejsapi(): boolean {
    return this._enablejsapi;
  }

  set enablejsapi(newEnablejsapi) {
    this._enablejsapi = newEnablejsapi;
    this.setupPlayerWithCurrentSetting();
  }

  @Input()
  get end(): number {
    return this._start;
  }

  set end(newEnd: number) {
    this._start = newEnd;
    this.setupPlayerWithCurrentSetting();
  }

  @Input()
  get fs(): boolean {
    return this._fs;
  }

  set fs(newFs) {
    this._fs = newFs;
    this.setupPlayerWithCurrentSetting();
  }

  @Input()
  get hl(): ISO6391TwoLetterLanguageCode | undefined {
    return this._hl;
  }

  set hl(newHl) {
    this._hl = newHl;
    this.setupPlayerWithCurrentSetting();
  }

  @Input()
  get ivLoadPolicy(): YouTubePlayerIVLoadPolicy {
    return this._ivLoadPolicy;
  }

  set ivLoadPolicy(newIvLoadPolicy) {
    this._ivLoadPolicy = newIvLoadPolicy;
    this.setupPlayerWithCurrentSetting();
  }

  @Input()
  get list(): string | undefined {
    return this._list;
  }

  set list(newList) {
    this._list = newList;
    if (newList && this.listType) {
      this.player?.loadPlaylist({
        list: newList,
        listType: this.listType,
      });
    }
  }

  @Input()
  get listType(): YouTubePlayerListType | undefined {
    return this._listType;
  }

  set listType(newListType) {
    this._listType = newListType;
    if (newListType && this.list) {
      this.player?.loadPlaylist({
        list: this.list,
        listType: newListType,
      });
    }
  }

  @Input()
  get loop(): boolean {
    return this._loop;
  }

  set loop(newLoop) {
    this._loop = newLoop;
    this.player?.setLoop(newLoop);
  }

  @Input()
  get modestbranding(): boolean {
    return this._modestbranding;
  }

  set modestbranding(newModestbranding) {
    this._modestbranding = newModestbranding;
    this.setupPlayerWithCurrentSetting();
  }

  @Input()
  get origin(): string | undefined {
    return this._origin;
  }

  set origin(newOrigin) {
    this._origin = newOrigin;
    this.setupPlayerWithCurrentSetting();
  }

  @Input()
  get playlist(): string | undefined {
    return this._playlist;
  }

  set playlist(newPlaylist) {
    this._playlist = newPlaylist;
    this.setupPlayerWithCurrentSetting();
  }

  @Input()
  get playsinline(): boolean | undefined {
    return this._playsinline;
  }

  set playsinline(newPlaysinline) {
    this._playsinline = newPlaysinline;
    this.setupPlayerWithCurrentSetting();
  }

  @Input()
  get rel(): boolean {
    return this._rel;
  }

  set rel(newRel) {
    this._rel = newRel;
    this.setupPlayerWithCurrentSetting();
  }

  @Input()
  get start(): number {
    return this._start;
  }

  set start(newStart: number) {
    this._start = newStart;
    this.setupPlayerWithCurrentSetting();
  }

  @Input()
  get widgetReferrer(): string | undefined {
    return this._widgetReferrer;
  }

  set widgetReferrer(newWidgetReferrer) {
    this._widgetReferrer = newWidgetReferrer;
    this.setupPlayerWithCurrentSetting();
  }

  htmlElementId: string = this.htmlIdPrefix + this.id;
  private _private = true;

  @Input()
  get private(): boolean {
    return this._private;
  }

  set private(newPrivate) {
    if (this._private !== newPrivate) {
      this._private = newPrivate;
      this.setupPlayerWithCurrentSetting();
    }
  }

  @Input()
  get id(): string {
    return this._id.value;
  }

  set id(newId) {
    const prevId = this._id.value;
    if (this.playerManager.has(prevId)) {
      this.playerManager.delete(prevId);
    }

    this._id.next(newId);

    if (this.player) {
      this.addToPlayerManager(this.player);
    }

    this.htmlElementId = this.htmlIdPrefix + newId;
  }

  @Input()
  get height(): number {
    return this._height;
  }

  set height(newHeight: number) {
    this._height = newHeight;
    this.player?.setSize(this.width, this.height);
  }

  @Input()
  get width(): number {
    return this._width;
  }

  set width(newWidth: number) {
    this._width = newWidth;
    this.player?.setSize(this.width, this.height);
  }

  @Input()
  get videoId(): string {
    return this._videoId;
  }

  set videoId(newVideoId: string) {
    this._videoId = newVideoId;
    this.player?.loadVideoById(this.videoId, this.start);
  }

  protected get api(): YouTubeIFrameApi | undefined {
    return this.iFrameApi.api;
  }

  get player(): YouTubePlayer | undefined {
    return this._player.value;
  }

  protected set player(newPlayer) {
    this._player.next(newPlayer);
  }

  constructor(
    private playerManager: YouTubePlayerManagerService,
    private iFrameApi: YouTubeIFrameApiService
  ) {
    this.subscriptions.push(
      this.iFrameApi.apiChange.subscribe({
        error: (err) => {
          throw err;
        },
      })
    );
  }

  ngOnInit() {
    this.subscriptions.push(
      this._player.subscribe((newPlayer) => {
        this.playerChange.emit(newPlayer);
      })
    );
    this.setupPlayerWithCurrentSetting();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());

    this.ready.complete();
    this.stateChange.complete();
    this.apiChange.complete();
    this.playbackRateChange.complete();
    this.playbackQualityChange.complete();
    this.playerChange.complete();

    this.ready.complete();
    this.stateChange.complete();
    this.apiChange.complete();
    this.playbackQualityChange.complete();
    this.playbackRateChange.complete();
    this.errorOccurrence.complete();

    this._player.complete();
  }

  setupPlayerWithCurrentSetting() {
    this.setupPlayerWith(this.htmlElementId, {
      height: this.height,
      width: this.width,
      videoId: this.videoId,
      host: this.private ? this.privateHost : this.nonPrivateHost,
      playerVars: {
        autoplay: booleanToNumericBoolean(this.autoplay),
        cc_lang_pref: this.ccLangPref,
        cc_load_policy: booleanToNumericBoolean(this.ccLoadPolicy),
        color: this.color,
        controls: booleanToNumericBoolean(this.controls),
        disablekb: booleanToNumericBoolean(this.disablekb),
        enablejsapi: booleanToNumericBoolean(this.enablejsapi),
        end: this.end,
        fs: booleanToNumericBoolean(this.fs),
        hl: this.hl,
        iv_load_policy: this.ivLoadPolicy,
        list: this.list,
        listType: this.listType,
        loop: booleanToNumericBoolean(this.loop),
        modestbranding: booleanToNumericBoolean(this.modestbranding),
        origin: this.origin,
        playlist: this.playlist,
        playsinline: booleanToNumericBoolean(this.playsinline),
        rel: booleanToNumericBoolean(this.rel),
        start: this.start,
        widget_referrer: this.widgetReferrer,
      },
    });
  }

  setupPlayerWith(
    elementId: string,
    config: Omit<YouTubeConfig, 'events'>
  ): void {
    const subscription = this.iFrameApi.apiChange.subscribe((api) => {
      if (!api) {
        return;
      }

      const player = new api.Player(elementId, {
        ...config,
        events: {
          onReady: () => {
            this.player = player;
            this.addToPlayerManager(player);
            this.ready.emit();
            subscription.unsubscribe();
          },
          onStateChange: (event) => {
            this.stateChange.emit(event.data);
          },
          onApiChange: (event) => {
            this.apiChange.emit(event);
          },
          onError: (event) => {
            this.errorOccurrence.emit(event.data);
          },
          onPlaybackQualityChange: (event) => {
            this.playbackQualityChange.emit(event.data);
          },
          onPlaybackRateChange: (event) => {
            this.playbackRateChange.emit(event.data);
          },
        },
      });
    });
  }

  private addToPlayerManager(newPlayer: YouTubePlayer) {
    this.playerManager.add(this.id, {
      player: newPlayer,
      ready: this.ready.asObservable(),
      stateChange: this.stateChange.asObservable(),
      apiChange: this.apiChange.asObservable(),
      playbackQualityChange: this.playbackQualityChange.asObservable(),
      playbackRateChange: this.playbackRateChange.asObservable(),
      errorOccurrence: this.errorOccurrence.asObservable(),
    });
  }
}
