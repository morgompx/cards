import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-white-cards',
  templateUrl: './white-cards.component.html',
  styleUrls: ['./white-cards.component.css'],
})
export class WhiteCardsComponent implements OnInit {
  @Input() cards: Array<Array<string>> = [];
  @Input() blackCard: string = '';
  @Output() selectedCard = new EventEmitter<Array<string>>();

  constructor() {}

  ngOnInit(): void {}

  displayWhiteCard(card: Array<string>) {
    if (this.blackCard) {
      return this.blackCard
        .split('<blank>')
        .reduce(
          (prev, curr, index, arr) =>
            index === arr.length - 1
              ? prev.concat(curr)
              : prev.concat(curr, card[index]),
          ''
        );
    }
    return card;
  }

  selectCard(card: Array<string>) {
    this.selectedCard.emit(card);
  }
}
