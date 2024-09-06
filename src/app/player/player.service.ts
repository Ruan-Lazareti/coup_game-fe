import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'http://localhost:8000/api/players'


  constructor(private http: HttpClient) { }

   // Obter todos os jogadores
   getPlayers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Obter um jogador específico por ID
  getPlayerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Criar um novo jogador
  createPlayer(playerData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, playerData);
  }

  // Atualizar um jogador existente
  updatePlayer(id: number, playerData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, playerData);
  }

  // Excluir um jogador
  deletePlayer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
