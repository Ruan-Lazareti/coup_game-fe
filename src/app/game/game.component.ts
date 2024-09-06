import { Component, OnInit } from '@angular/core';
import { GameService } from "./game.service";
import { Player } from "../models/player.model"
import { Card } from "../models/card.model";
import { Game } from "../models/game.model";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  standalone: true,
  styleUrl: './game.component.css'
})

export class GameComponent implements OnInit {
  game: Game | undefined;

  playerHands: Map<number, Card[]> | undefined;
  currentPlayer: Player | undefined;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.initializeDeck().subscribe(deck => {
      const players = Array.from({ length: 2 }, (_, i) => new Player(i, `Player ${i + 1}`)); //mudar qtde de player
      this.playerHands = this.gameService.dealCards(deck, 1); //mudar qtde de player

      players.forEach(player => {
        const cards = this.playerHands?.get(player.id);
        player.hand = cards ? cards : [];
        console.log(`Player ${player.name} cards:`, player.hand);
      })

      this.gameService.startGame(players).subscribe(() => {
        console.log('Game Started!')
      });
    })
  }

  nextTurn() {
    this.gameService.nextTurn();
    this.currentPlayer = this.gameService.getCurrentPlayer();
  }
}
