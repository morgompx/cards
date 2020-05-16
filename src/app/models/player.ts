import { WhiteCard } from './white-card';
import { BlackCard } from './black-card';

export interface Player {
  id: number;
  hand: Array<WhiteCard>;
  winnings?: Array<BlackCard>;
}
