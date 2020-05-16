import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  game$: Observable<Game>;
  user$: Observable<User>;

  constructor(
    private readonly gameService: GameService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.game$ = this.gameService.get$();
    this.user$ = this.userService.get$();
  }
}
