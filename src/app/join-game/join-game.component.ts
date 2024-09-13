import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import { GameService } from "./game.service";
import { Player } from "../models/player.model"
import {start} from "@popperjs/core";

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  standalone: true,
  imports: [
    FormsModule,
      CommonModule,
  ],
  styleUrl: './join-game.component.css'
})

export class JoinGameComponent implements OnInit {
  players: Player[] = [];
  nickname: string = '';
  gameId: string | null = '';

  constructor(
      private gameService: GameService,
      private route: ActivatedRoute,
      private router: Router,
  ) {}

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('game_id');
    this.loadPlayers();
    this.gameService.listenToGameStart(this.gameId);

    if (this.gameId) {
      this.gameService.listenToPlayers(this.gameId, (newPlayer: Player) => {
        this.players.push(newPlayer);
      });
    }
  }

  loadPlayers() {
    this.gameService.getPlayers(this.gameId).subscribe((players: Player[]) => {
      this.players = players
    });
  }

  addPlayer() {
    this.gameService.addPlayer(this.nickname, this.gameId).subscribe((newPlayer: Player) => {
      this.nickname = '';
    });
  }

  startGame() {
    this.gameService.startGame(this.gameId).subscribe(() => {})
  }

  protected readonly start = start;
}
