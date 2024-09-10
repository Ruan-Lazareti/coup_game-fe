import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { CardAddComponent } from './card-add/card-add.component';
import { PlayerComponent } from './player/player.component';
import {CardComponent} from "./card/card.component";
import {CardEditComponent} from "./card-edit/card-edit.component";

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'game', component: GameComponent},
  { path: 'cards', component: CardComponent },
  { path: 'add-card', component: CardAddComponent },
  { path: 'cards/:id', component: CardEditComponent },
  { path: 'player', component: PlayerComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule { }
