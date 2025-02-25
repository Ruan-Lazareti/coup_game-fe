import {Component, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

import { GameService } from "./join-game/game.service";
import {CardService} from "../card/card.service";
import { Player } from "../player/player.model";
import { Card } from "../card/card.model";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage
  ],
})
export class GameComponent implements OnInit {
  gameId: string | null = '';
  players: Player[] = [];
  cards: Card[] = [];
  imgUrl: string;
  currentPlayer: Player | null = null;

  constructor(
      private gameService: GameService,
      private cardService: CardService,
      private route: ActivatedRoute,
  ) {
    this.imgUrl = this.cardService.imgUrl;
  }

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('game_id');
    this.loadPlayers();
    this.loadPlayerCards();

    this.gameService.listenToTurnChange(this.gameId, (currentPlayer: Player) => {
      this.updateCurrentPlayer(currentPlayer);
      /*this.updatePlayer(currentPlayer);*/
    });

    /*this.gameService.listenToPlayerUpdates(this.gameId, (player: Player) => {
      this.updatePlayer(player);
    })*/
  }

  loadPlayers() {
    /*this.gameService.getGame(this.gameId).subscribe((players: Player[]) => {
      this.players = players;
    });*/
  }

  loadPlayerCards() {
    this.gameService.getPlayerCards(this.gameId).subscribe((cards: Card[]) => {
      this.cards = cards;
    })
  }

  updateCurrentPlayer(currentPlayer: Player) {
    this.currentPlayer = currentPlayer;
  };

  /*updatePlayer(player: Player) {
    const index = this.players.findIndex(p => p.session_id === player.session_id)
    console.log(index)
    if (index !== -1) {
      this.players[index] = player;
    }
  }*/

  //Funções do jogo
  income() {
    this.gameService.income(this.gameId).subscribe(() => {})
  }
}
