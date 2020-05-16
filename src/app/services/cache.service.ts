import { Injectable } from '@angular/core';
import { RxCacheService, RxCacheItem } from 'ngx-rxcache';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { skipWhile, map } from 'rxjs/operators';
import Peer from 'peerjs';
import { set, cloneDeep } from 'lodash';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  item: RxCacheItem<Partial<Game>>;
  peer: Peer;
  peerId$: BehaviorSubject<string>;

  constructor(private readonly cache: RxCacheService) {
    this.peer = new Peer();
    this.peerId$ = new BehaviorSubject(null);

    this.peer.on('open', (id) => {
      this.peerId$.next(id);
    });

    this.peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        this.update(data);
      });
    });
  }

  initialize(initialValue: Partial<Game> = null): Observable<boolean> {
    this.item = this.cache.get({
      id: 'game',
      initialValue,
      autoload: true,
    });
    return this.get$().pipe(
      skipWhile((item) => !item),
      map(() => true)
    );
  }

  get$(): Observable<Partial<Game>> {
    return this.item.value$;
  }

  getPeerId$(): Observable<string> {
    return this.peerId$.pipe(skipWhile((id) => !id));
  }

  update(data: any = null, path: string = null) {
    console.log(`received: ${data}, ${path}`);
    if (!path) {
      this.item.update(data);
    } else {
      let itemValue = cloneDeep(this.item.value);
      this.item.update(set(itemValue, path.split('.'), data));
    }
  }
}
