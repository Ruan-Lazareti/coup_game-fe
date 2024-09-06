import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Card } from '../models/card.model';
import { Game } from '../models/game.model';
import {Player} from "../models/player.model";

@Injectable({
  providedIn: 'root'
})

export class GameService {
  private cardsUrl = 'http://localhost:8000/api/cards'

  private game: Game = new Game()

  constructor(private http: HttpClient) {
  }

  initializeDeck(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsUrl);
  }

  dealCards(deck: Card[], numPlayers: number): Map<number, Card[]> {
    const playerHands = new Map<number, Card[]>();

    for (let i = 0; i < numPlayers; i++) {
      playerHands.set(i, []);
    }

    for (let i = 0; i < numPlayers * 2; i++) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const selectedCard = deck[randomIndex];
      const playerIndex = i % numPlayers;
      playerHands.get(playerIndex)!.push(selectedCard);
    }

    return playerHands;
  }

  startGame(players: Player[]): Observable<void> {
    return new Observable(observer => {
      this.initializeDeck().subscribe(deck => {
        this.game.initialize(players, deck);
        observer.next();
        observer.complete();
      });
    });
  }

  getCurrentPlayer(): Player {
    return this.game.getCurrentPlayer();
  }

  nextTurn(): void {
    this.game.nextTurn();
  }
}
