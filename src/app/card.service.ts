import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from './models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'http://localhost:8000/api/cards';
  public imgUrl = 'http://localhost:8000/storage/';

  constructor(private http: HttpClient) { }

  // Obter todos os cards
  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl);
  }

  // Obter um card por ID
  getCardById(id: number): Observable<Card> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Card>(url);
  }

  // Criar um novo card
  addCard(card: FormData): Observable<Card> {
    return this.http.post<Card>(this.apiUrl, card);
  }

  // Atualizar um card existente
  updateCard(id: number, card: Card): Observable<Card> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Card>(url, card);
  }

  // Excluir um card
  deleteCard(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
