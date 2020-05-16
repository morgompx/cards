import { Player } from './player';
import { Dealer } from './dealer';
import { BlackCard } from './black-card';
import { WhiteCard } from './white-card';

export interface Game {
  host: Player;
  players: Array<Player>;
  dealer?: Dealer;
  blackDeck: Array<BlackCard>;
  blackDiscard: Array<BlackCard>;
  whiteDeck: Array<WhiteCard>;
  whiteDiscard: Array<WhiteCard>;
}
