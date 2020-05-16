import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { DealerComponent } from './components/dealer/dealer.component';
import { PlayerComponent } from './components/player/player.component';
import { WhiteCardsComponent } from './components/white-cards/white-cards.component';
import { BlackCardsComponent } from './components/black-cards/black-cards.component';

@NgModule({
  declarations: [
    GameComponent,
    DealerComponent,
    PlayerComponent,
    WhiteCardsComponent,
    BlackCardsComponent,
  ],
  imports: [CommonModule, GameRoutingModule, MatCardModule, MatButtonModule],
})
export class GameModule {}
