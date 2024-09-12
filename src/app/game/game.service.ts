import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

import {Player} from '../models/player.model';

@Injectable({
  providedIn: 'root'
})

export class GameService {
  private cardsUrl = 'http://localhost:8000/api/cards';
  private gameUrl = 'http://localhost:8000/api/game';
  private csrfToken: string | undefined;
  private echo: Echo;

  constructor(private http: HttpClient) {
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

  listenToPlayers(gameId: string | null, onPlayerJoined: (player: Player) => void) {
    if(gameId) {
      this.echo.channel(`game.${gameId}`).listen('PlayerJoined', (event: any) => {
        console.log('New Player Joined:', event.player);
        onPlayerJoined(event.player);
      })
    }
  }

  createGame() {
    return this.http.post(`${this.gameUrl}/create`,'');
  }

  addPlayer(nickname: string, game_id: string | null): Observable<Player> {
    const body = { name: nickname,
                   game_id: game_id};
    return this.http.post<Player>(`${this.gameUrl}/join`, body, this.getHttpOptions());
  }

  getPlayers(game_id: string | null): Observable<Player[]> {
    const params = { game_id: game_id || ''};
    return this.http.get<Player[]>(`${this.gameUrl}/players`, {params});
  }
}
