import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from './models/game.model'; 

@Injectable({
  providedIn: 'root'
})

export class GameService {

  private apiUrl = 'http://localhost:8000/api/games'
  
  constructor(private http: HttpClient) { }
  
  // Obter todos os jogos
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  // Obter um jogo por ID
  getGame(id: number): Observable<Game> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Game>(url);
  }

  // Criar um novo jogo
  createGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.apiUrl, game);
  }

  // Atualizar um jogo existente
  updateGame(id: number, game: Game): Observable<Game> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Game>(url, game);
  }

  // Excluir um jogo
  deleteGame(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}