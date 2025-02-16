import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "@environments/environment"
import { Card } from './card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl: string = environment.apiUrl;
  public imgUrl: string = environment.imgUrl;
  private cardsUrl: string = this.apiUrl + '/cards';

  constructor(private http: HttpClient) { }

  // Obter todos os cards
  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsUrl);
  }

  // Obter um card por ID
  getCardById(id: number): Observable<Card> {
    return this.http.get<Card>(this.cardsUrl + `/${id}`);
  }

  // Criar um novo card
  addCard(card: FormData): Observable<Card> {
    return this.http.post<Card>(this.cardsUrl, card);
  }

  // Atualizar um card existente
  updateCard(id: number, card: Card): Observable<Card> {
    return this.http.put<Card>(this.cardsUrl + `/${id}`, card);
  }

  // Excluir um card
  deleteCard(id: number): Observable<void> {
    return this.http.delete<void>(this.cardsUrl + `/${id}`);
  }
}
