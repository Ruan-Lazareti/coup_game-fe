import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl: string = environment.apiUrl;
  private playersUrl: string = this.apiUrl + '/players';


  constructor(private http: HttpClient) { }

   // Obter todos os jogadores
   getPlayers(): Observable<any> {
    return this.http.get<any>(this.playersUrl);
  }

  // Obter um jogador específico por ID
  getPlayerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.playersUrl}/${id}`);
  }

  // Criar um novo jogador
  createPlayer(playerData: any): Observable<any> {
    return this.http.post<any>(this.playersUrl, playerData);
  }

  // Atualizar um jogador existente
  updatePlayer(id: number, playerData: any): Observable<any> {
    return this.http.put<any>(`${this.playersUrl}/${id}`, playerData);
  }

  // Excluir um jogador
  deletePlayer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.playersUrl}/${id}`);
  }

}
