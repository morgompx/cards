import { Injectable } from '@angular/core';
import Peer from 'peerjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class PeeringService {
  private peer: Peer;
  private peerId$: BehaviorSubject<string>;
  private connections: Array<Peer.DataConnection>;
  private data$: BehaviorSubject<Game>;

  constructor() {
    this.peer = new Peer();
    this.peerId$ = new BehaviorSubject<string>(null);
    this.connections = [];
    this.data$ = new BehaviorSubject<Game>(null);

    this.peer.on('open', (id) => {
      this.peerId$.next(id);
      console.log(`My peer ID is ${id}`);
    });

    this.peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        this.data$.next(data);
      });
    });
  }

  connect(id: string = null) {
    if (id) {
      this.connections.push(this.peer.connect(id));
      this.connections[this.connections.length - 1].on('open', () => {
        console.log(`Connected to ${id}`);
      });
    }
  }

  get$ = () => this.data$.asObservable();

  getId$ = () => this.peerId$.asObservable();

  updateAll = (data) => {};
}
