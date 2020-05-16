import { Component, OnInit } from '@angular/core';
import { Role } from '../../../../models/role';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css'],
})
export class DealerComponent implements OnInit {
  readonly role: Role = Role.DEALER;
  blackCard: string;
  draw;
  pick;
  playerCards: Array<Array<string>>;
  userAction: string = 'Waiting for players to pick their card';

  constructor() {}

  ngOnInit(): void {
    this.blackCard = `Hey Reddit! I'm \n<blank>. \nAsk me anything.`;
    this.draw = 2;
    this.pick = 1;
    this.playerCards = [['A squid']];
  }

  selectWinner(card: Array<string>) {
    console.log(card);
  }
}
