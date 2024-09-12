import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import { GameService } from "./game.service";
import { Player } from "../models/player.model"
import { Card } from "../models/card.model";
import { Game } from "../models/game.model";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  standalone: true,
  imports: [
    FormsModule,
      CommonModule,
  ],
  styleUrl: './game.component.css'
})

export class GameComponent implements OnInit {
  game: Game | undefined;
  players: Player[] = [];
  nickname: string = '';
  gameId: string | null = '';

  constructor(
      private gameService: GameService,
      private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('game_id');
    this.loadPlayers();

    if (this.gameId) {
      this.gameService.listenToPlayers(this.gameId, (newPlayer: Player) => {
        this.players.push(newPlayer);
      });
    }
  }

  loadPlayers() {
    this.gameService.getPlayers(this.gameId).subscribe((players: Player[]) => {
      this.players = players
      console.log(players);
    });
  }

  addPlayer() {
    this.gameService.addPlayer(this.nickname, this.gameId).subscribe((newPlayer: Player) => {
      this.players.push(newPlayer);
      this.nickname = 'Test';
    });
  }
}
