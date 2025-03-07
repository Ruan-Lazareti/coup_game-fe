import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import Echo from "laravel-echo";

import { GameService } from "./game.service";
import { Player } from "../../player/player.model"
import {Game} from "../game.model";

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
  gameId: string | null = '';
  players: Player[] = [];
  private echo!: Echo<any>;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('game_id');
    this.getGame();
    this.gameService.listenToGameStart(this.gameId);

    if (this.gameId) {
      this.gameService.listenToPlayers(this.gameId, (newPlayer: Player) => {
        const exists = this.players.some(player => player.nickname === newPlayer.nickname);

        if (!exists) {
          this.players.push(newPlayer);
        }
      });
    }
  }

  getGame() {
    this.gameService.getGame(this.gameId).subscribe((resp: Game): void => {
      this.players = resp.players.map((nickname: string) => ({ nickname }))
    });
  }

  startGame() {
    this.gameService.startGame(this.gameId).subscribe(() => {})
  }
}
