import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import Echo from 'laravel-echo';
import Pusher from "pusher-js";
import {environment} from "@environments/environment";

import {Player} from '../../player/player.model';
import {Card} from "../../card/card.model";
import {Router} from "@angular/router";
import {Game} from "../game.model";

@Injectable({
  providedIn: 'root'
})

export class GameService {
  private apiUrl: string = environment.apiUrl;
  public imgUrl: string = environment.imgUrl;
  private cardsUrl: string = this.apiUrl + '/cards';
  private gameUrl: string = this.apiUrl + '/game/';
  private csrfToken: string | undefined;
  private echo: Echo<any>;
  private pusher: Pusher;

  constructor(
      private http: HttpClient,
      private router: Router,
  ) {
    this.getCsrfToken().subscribe(() => {
      this.csrfToken = this.getCookie('XSRF-TOKEN');
    });

    this.pusher = new Pusher("513fb8d8b51e5195496f", {forceTLS: true, cluster: 'sa1'});

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
        onPlayerJoined(event);
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
  createGame(nickname: string): Observable<any> {
    return this.http.post(this.gameUrl, { nickname });
  }

  joinGame(nickname: string, gameId: string): Observable<any> {
    return this.http.post(this.gameUrl + `join/${gameId}`, { nickname });
  }

  /*addPlayer(nickname: string, game_id: string | null): Observable<Player> {
    const body = { name: nickname,
                   game_id: game_id};
    return this.http.post<Player>(`${this.gameUrl}/join`, body, this.getHttpOptions()).pipe(
        tap((player: Player) => {
          localStorage.setItem('session_id', player.session_id);
        })
    );
  }*/

  getGame(game_id: string | null): Observable<Game> {
    return this.http.get<Game>(this.gameUrl + game_id);
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
