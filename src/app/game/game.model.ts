import { Injectable } from '@angular/core';
import { Card } from '../card/card.model';
import {Player} from "../player/player.model";

@Injectable({
  providedIn: 'root'
})
export class Game {
  private players: Map<number, Player> = new Map();
  private currentPlayerIndex: number = 0;
  private deck: Card[] = [];

  constructor() { }

  initialize(players: Player[], deck: Card[]): void {
    this.players = new Map(players.map((player, index) => [index, player]));
    this.deck = deck;
  }

  getCurrentPlayer(): Player {
    return this.players.get(this.currentPlayerIndex)!;
  }

  nextTurn(): void {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.size;
  }
}
