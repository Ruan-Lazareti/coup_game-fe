import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import { GameService } from "./game.service";
import { Player } from "../../player/player.model"
import {start} from "@popperjs/core";
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
  nickname: string = '';
  players: Player[] = [];
  gameStatus: string = '';

  constructor(
      private gameService: GameService,
      private route: ActivatedRoute,
      private router: Router,
  ) {}

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('game_id');
    this.getGame();
    this.gameService.listenToGameStart(this.gameId);

    if (this.gameId) {
      this.gameService.listenToPlayers(this.gameId, (newPlayer: Player) => {
        this.players.push(newPlayer);
      });
    }
  }

  getGame() {
    this.gameService.getGame(this.gameId).subscribe((resp: Game):void => {
      this.players = resp.players.map((nickname:string) => ({ nickname }))
      console.log(this.players)
    });
  }

 /* addPlayer() {
    this.gameService.addPlayer(this.nickname, this.gameId).subscribe((newPlayer: Player) => {
      this.nickname = '';
    });
  }*/

  startGame() {
    this.gameService.startGame(this.gameId).subscribe(() => {})
  }

  protected readonly start = start;
}
