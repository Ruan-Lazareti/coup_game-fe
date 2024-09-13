import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import { GameService } from "../join-game/game.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
      private gameService: GameService,
      private router: Router,
  ) {}
  createGame() {
    this.gameService.createGame().subscribe((url) => this.router.navigate([`/game/join/${url}`]));
  }
}
