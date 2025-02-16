import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perk } from '../shared/models/perk.model';
import {environment} from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PerksService {
  private apiUrl: string = environment.apiUrl;
  private perksUrl: string = this.apiUrl + '/perks';
  constructor(private http: HttpClient) { }

  getPerks(): Observable<Perk[]> {
    return this.http.get<Perk[]>(this.perksUrl);
  }
}
