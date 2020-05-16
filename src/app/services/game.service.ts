import { Injectable } from '@angular/core';
import { RxCacheService, RxCacheItem } from 'ngx-rxcache';
import { Game } from '../models/game';
import { of, Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BlackCard } from '../models/black-card';
import { WhiteCard } from '../models/white-card';
import { UserService } from './user.service';
import { PeeringService } from './peering.service';
import {
  take,
  switchMap,
  takeUntil,
  takeWhile,
  skipWhile,
  map,
} from 'rxjs/operators';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(
    private readonly http: HttpClient,
    private readonly cache: CacheService
  ) {}

  initialize(hostId: string = null): Observable<boolean> {
    return forkJoin({
      whiteDeck: this.http.get<Array<WhiteCard>>('assets/white-cards.json'),
      blackDeck: this.http.get<Array<BlackCard>>('assets/black-cards.json'),
    }).pipe(
      switchMap(({ whiteDeck, blackDeck }) => {
        return this.cache.getPeerId$().pipe(
          switchMap((peerId) => {
            return this.cache
              .initialize({
                hostId: hostId ? hostId : peerId,
                players: [],
                dealer: null,
                blackDeck,
                blackDiscard: [],
                whiteDeck,
                whiteDiscard: [],
              })
              .pipe(
                skipWhile((isInitialized) => !isInitialized),
                map(() => true)
              );
          })
        );
      })
    );
  }

  get$(): Observable<Partial<Game>> {
    return this.cache.get$();
  }
}
