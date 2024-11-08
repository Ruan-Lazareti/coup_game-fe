import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import Echo from 'laravel-echo';

import {Player} from '../models/player.model';
import {Card} from "../models/card.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class GameService {
  private cardsUrl = 'http://localhost:8000/api/cards';
  private gameUrl = 'http://localhost:8000/api/game';
  private csrfToken: string | undefined;
  private echo: Echo;

  constructor(
      private http: HttpClient,
      private router: Router,
  ) {
    this.getCsrfToken().subscribe(() => {
      this.csrfToken = this.getCookie('XSRF-TOKEN');
    });
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: '513fb8d8b51e5195496f',
      cluster: 'sa1',
      forceTLS: true,
    });
  }

  //Funções para CSRF
  private getCsrfToken(): Observable<void> {
    return this.http.get<void>('http://localhost:8000/sanctum/csrf-cookie', {withCredentials: true});
  }

  private getCookie(name: string): string | undefined {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : undefined;
  }

  private getHttpOptions(): { headers: HttpHeaders} {
    const headers = new HttpHeaders({
      'X-CSRF-TOKEN': this.csrfToken || 'f'
    });
    return { headers };
  }

  //Listeners
  listenToPlayers(gameId: string | null, onPlayerJoined: (player: Player) => void) {
    if(gameId) {
      this.echo.channel(`game.${gameId}`).listen('PlayerJoined', (event: any) => {
        onPlayerJoined(event.player);
      })
    }
  }

  listenToGameStart(gameId: string | null): void {
    if(gameId) {
      this.echo.channel(`game.${gameId}`).listen('GameStarted', () => {
        this.router.navigate([`/game/play/${gameId}`]);
      });
    }
  }

  listenToTurnChange(gameId: string | null, onTurnChanged: (currentPlayer: Player) => void) {
    if(gameId) {
      this.echo.channel(`game.${gameId}`).listen('TurnChanged', (event: any) => {
        onTurnChanged(event.currentPlayer);
      });
    }
  }

  listenToPlayerUpdates(gameId: string | null, onUpdatePlayer: (updatedPlayer: Player) => void) {
    this.echo.channel(`game.${gameId}`).listen('PlayerUpdated', (event: any) => {
      console.log(event.updatedPlayer);
      onUpdatePlayer(event.updatedPlayer);
    })
  }


  //Funções de início de jogo
  createGame() {
    return this.http.post(`${this.gameUrl}/create`,'');
  }

  addPlayer(nickname: string, game_id: string | null): Observable<Player> {
    const body = { name: nickname,
                   game_id: game_id};
    return this.http.post<Player>(`${this.gameUrl}/join`, body, this.getHttpOptions()).pipe(
        tap((player: Player) => {
          localStorage.setItem('session_id', player.session_id);
        })
    );
  }

  getPlayers(game_id: string | null): Observable<Player[]> {
    const params = { game_id: game_id || '' };
    return this.http.get<Player[]>(`${this.gameUrl}/players`, {params});
  }


  startGame(gameId: string | null): Observable<any> {
    const body = { game_id: gameId };
    return this.http.post(`${this.gameUrl}/start`, body, this.getHttpOptions());
  }

  getPlayerCards(game_id: string | null): Observable<Card[]> {
    const sessionId = localStorage.getItem('session_id');
    const params = { game_id: game_id || '',
                     session_id: sessionId || ''
                    };
    return this.http.get<Card[]>(`${this.gameUrl}/player-cards`, {params});
  }


  //Funcionalidades do jogo
  income(game_id: string | null): Observable<Player> {
    const sessionId = localStorage.getItem('session_id');
    const params = { game_id: game_id || '',
      session_id: sessionId || ''
    };

    return this.http.get<Player>(`${this.gameUrl}/income`, {params});
  }
}