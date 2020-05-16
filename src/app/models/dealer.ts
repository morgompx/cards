import { BlackCard } from './black-card';
import { WhiteCard } from './white-card';

export interface Dealer {
  playerId: number;
  blackCardInPlay: BlackCard;
  whiteCardsFromPlayers?: Array<Array<WhiteCard>>;
}
