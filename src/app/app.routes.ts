import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CardComponent } from "./card/card.component";
import { CardAddComponent } from './card/card-add/card-add.component';
import { CardEditComponent } from "./card/card-edit/card-edit.component";
import { PlayerComponent } from './player/player.component';
import { JoinGameComponent } from './game/join-game/join-game.component';
import { GameComponent } from "./game/game.component";

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'cards', component: CardComponent },
  { path: 'add-card', component: CardAddComponent },
  { path: 'cards/:id', component: CardEditComponent },
  { path: 'game/join/:game_id', component: JoinGameComponent},
  { path: 'game/play/:game_id', component: GameComponent},
  { path: 'player', component: PlayerComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule { }
