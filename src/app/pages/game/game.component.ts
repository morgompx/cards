import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  game$: Observable<Partial<Game>>;

  constructor(
    private readonly gameService: GameService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.gameService
      .initialize(
        this.route.snapshot.paramMap.get('id')
          ? this.route.snapshot.paramMap.get('id')
          : null
      )
      .subscribe(() => {
        this.game$ = this.gameService.get$();
      });
  }
}
