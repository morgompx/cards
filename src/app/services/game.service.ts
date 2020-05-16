import { Injectable } from '@angular/core';
import { RxCacheService, RxCacheItem } from 'ngx-rxcache';
import { Game } from '../models/game';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BlackCard } from '../models/black-card';
import { WhiteCard } from '../models/white-card';
import { UserService } from './user.service';
import { PeeringService } from './peering.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private blackDeck: Array<BlackCard>;
  private whiteDeck: Array<WhiteCard>;
  private game: RxCacheItem<Game>;
  private game$;

  constructor(
    private readonly cache: RxCacheService,
    private readonly http: HttpClient,
    private readonly userService: UserService
  ) //private readonly peeringService: PeeringService
  {
    this.http
      .get<Array<BlackCard>>('assets/black-cards.json')
      .subscribe((data) => (this.blackDeck = data));
    this.http
      .get<Array<WhiteCard>>('assets/white-cards.json')
      .subscribe((data) => (this.whiteDeck = data));
    this.game = this.cache.get<Game>({
      id: 'game',
      construct: this.initGame,
      autoload: true,
    });
    this.game$ = this.game.value$;
  }

  get$ = () => this.game$;

  update = (value) => {
    this.game.update(value);
    //this.peeringService.updateAll(value);
  };

  initGame(): Observable<Game> {
    return of({
      host: null,
      players: [],
      dealer: null,
      blackDeck: this.blackDeck,
      blackDiscard: [],
      whiteDeck: this.whiteDeck,
      whiteDiscard: [],
    });
  }
}
