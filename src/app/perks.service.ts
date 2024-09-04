import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perk } from './models/perk.model';

@Injectable({
  providedIn: 'root'
})
export class PerksService {
  private apiUrl = 'http://localhost:8000/api/perks';
  constructor(private http: HttpClient) { }

  getPerks(): Observable<Perk[]> {
    return this.http.get<Perk[]>(this.apiUrl);
  }
}
