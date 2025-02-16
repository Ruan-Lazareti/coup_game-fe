import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import { GameService } from "../game/join-game/game.service";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  isModalOpen: boolean = false;
  nickname: string = '';
  gameId: string = '';

  constructor(
      private gameService: GameService,
      private router: Router,
  ) {}

  openModal():void {
    this.isModalOpen = true;
  }

  closeModal():void {
    this.isModalOpen = false;
  }

  createGame(nickname: string):void {
    this.gameService.createGame(nickname).subscribe((resp) => {
      this.gameId = resp.game_id;
      this.closeModal();

      this.router.navigate([`/game/join/${this.gameId}`]);
    });
  }
}
