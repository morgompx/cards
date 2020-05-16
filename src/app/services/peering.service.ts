import { Injectable } from '@angular/core';
import Peer from 'peerjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeeringService {
  private peer: Peer;
  private peerId$: BehaviorSubject<string>;
  private hostId$: BehaviorSubject<string>;
  private connections: Array<Peer.DataConnection>;
  private data$: BehaviorSubject<any>;

  constructor() {
    this.peer = new Peer();
    this.peerId$ = new BehaviorSubject<string>(null);
    this.hostId$ = new BehaviorSubject<string>(null);
    this.connections = [];
    this.data$ = new BehaviorSubject<any>(null);

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

  updateClients = (data) => {
    this.data$.next(data);
    for (const conn of this.connections) {
      conn.send(data);
    }
  };

  updateHost = (id, data) => {
    this.data$.next(data);
    this.connections.filter((conn) => conn.peer === id)[0].send(data);
  };
}
