import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {PlayerData, YouTubePlayerManagerService} from "../../interfaces/src/services";

@Injectable({
  providedIn: 'root',
})
export class StandardYouTubePlayerManagerService extends YouTubePlayerManagerService {
  private map: Map<string, PlayerData> = new Map();
  private _newEntry: Subject<PlayerData> = new Subject();

  get newEntry(): Observable<PlayerData> {
    return this._newEntry.asObservable();
  }

  add(id: string, data: Omit<PlayerData, 'id'>): void {
    if (this.map.has(id)) {
      console.error('Player data has been overwritten for ' + id);
    }

    const rejoinedData = {
      id,
      ...data,
    };

    this._newEntry.next(rejoinedData);
    this.map.set(id, rejoinedData);
  }

  delete(id: string): void {
    this.map.delete(id);
  }

  get(id: string): PlayerData | undefined {
    return this.map.get(id);
  }

  has(id: string): boolean {
    return this.map.has(id);
  }
}
