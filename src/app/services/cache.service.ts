import { Injectable } from '@angular/core';
import { RxCacheService, RxCacheItem } from 'ngx-rxcache';
import { Observable, BehaviorSubject } from 'rxjs';
import { skipWhile, map, switchMap, take, tap } from 'rxjs/operators';
import Peer, { DataConnection } from 'peerjs';
import { set, cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  item: RxCacheItem<Partial<any>>;
  peer: Peer;
  peerId$: BehaviorSubject<string>;
  hostId$: BehaviorSubject<string>;
  connections: Array<DataConnection>;

  constructor(private readonly cache: RxCacheService) {
    this.peer = new Peer();
    this.peerId$ = new BehaviorSubject(null);
    this.hostId$ = new BehaviorSubject(null);
    this.connections = [];

    this.peer.on('open', (id) => {
      console.log(`peerId is ${id}`);
      this.peerId$.next(id);
    });

    this.peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        console.log(data);
        switch (data) {
          case '[request]':
            this.get$()
              .pipe(take(1))
              .subscribe((item) => {
                console.log(item);
                console.log(`[request] send to ${conn.peer}`);
                conn.send('hello');
              });
            break;
          default:
            console.log(`data received`);
            console.log(data);
            this.update(data);
        }
      });
    });
  }

  initialize(
    initialValue: Partial<any> = null,
    hostId: string = null
  ): Observable<boolean> {
    this.item = this.cache.get({
      id: 'game',
      initialValue: hostId ? null : initialValue,
      autoload: true,
    });

    if (hostId) {
      const conn = this.peer.connect(hostId);
      this.connections.push(conn);
      conn.on('open', () => {
        console.log(`Host connected - ${hostId}`);
        this.hostId$.next(hostId);
      });

      return this.getHost$().pipe(
        tap((host) => {
          console.log('send [request]');
          console.log(host.peer);
          host.send('[request]');
        }),
        switchMap(() => this.get$()),
        map(() => true)
      );
    }

    return this.get$().pipe(map(() => true));
  }

  get$(): Observable<Partial<any>> {
    return this.item.value$.pipe(skipWhile((item) => !item));
  }

  getPeerId$(): Observable<string> {
    return this.peerId$.pipe(skipWhile((id) => !id));
  }

  getHostId$(): Observable<string> {
    return this.hostId$.pipe(skipWhile((id) => !id));
  }

  getHost$(): Observable<DataConnection> {
    return this.getHostId$().pipe(
      map((hostId) => {
        return this.connections.find((conn) => hostId === conn.peer);
      }),
      take(1)
    );
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
