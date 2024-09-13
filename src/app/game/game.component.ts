import {Component, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

import { GameService } from "../join-game/game.service";
import {CardService} from "../card/card.service";
import { Player } from "../models/player.model";
import { Card } from "../models/card.model";

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

  constructor(
      private gameService: GameService,
      private cardService: CardService,
      private route: ActivatedRoute,
  ) { this.imgUrl = this.cardService.imgUrl; }

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('game_id');
    this.loadPlayers();
    this.loadPlayerCards();

  }

  loadPlayers() {
    this.gameService.getPlayers(this.gameId).subscribe((players: Player[]) => {
      this.players = players
    });
  }

  loadPlayerCards() {
    this.gameService.getPlayerCards(this.gameId).subscribe((cards: Card[]) => {
      this.cards = cards;
    })
  }

}
