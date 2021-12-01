import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { YouTubeIFrameApi } from '../models';

export function getIFrameApi() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return window.YT as YouTubeIFrameApi;
}

export abstract class YouTubeIFrameApiService {
  abstract api: YouTubeIFrameApi | undefined;
  abstract apiChange: Observable<YouTubeIFrameApi | undefined>;
}

@Injectable({
  providedIn: 'root',
})
export class StandardYouTubeIFrameApiService extends YouTubeIFrameApiService {
  private _api = new BehaviorSubject<YouTubeIFrameApi | undefined>(undefined);

  get api(): YouTubeIFrameApi | undefined {
    return this._api.value;
  }

  get apiChange(): Observable<YouTubeIFrameApi | undefined> {
    return this._api.asObservable();
  }

  constructor() {
    super();

    const maybeExistingApi = getIFrameApi();
    if (!maybeExistingApi) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (!firstScriptTag || !firstScriptTag.parentNode) {
        this._api.error(
          new Error(
            'Could not find or initialize YouTube IFrame API. No first script tag was found in the document'
          )
        );
        return;
      }

      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.onYouTubeIframeAPIReady = () => {
        this._api.next(getIFrameApi());
      };
    } else {
      this._api.next(maybeExistingApi);
    }
  }
}
