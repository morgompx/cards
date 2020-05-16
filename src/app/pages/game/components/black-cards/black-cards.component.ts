import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-black-cards',
  templateUrl: './black-cards.component.html',
  styleUrls: ['./black-cards.component.css'],
})
export class BlackCardsComponent implements OnInit {
  @Input() draw: number = 0;
  @Input() pick: number = 0;
  @Input() cardText: string = '';

  constructor() {}

  ngOnInit(): void {}

  getCardText(): string {
    return this.cardText.split('<blank>').join('_____________');
  }
}
