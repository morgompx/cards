import { Component, OnInit } from '@angular/core';
import { Role } from '../../../../models/role';
import { WhiteCard } from 'src/app/models/white-card';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  readonly role: Role = Role.PLAYER;
  blackCard: string = '';
  draw;
  pick;
  playerCards: Array<Array<string>>;
  userAction: string = 'Play your cards';

  constructor() {}

  ngOnInit(): void {}

  selectPlay(card: WhiteCard) {}
}
