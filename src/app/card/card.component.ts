import { Component, OnInit } from '@angular/core';
import {HomeComponent} from "../home/home.component";
import {FormsModule} from "@angular/forms";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {CardService} from "./card.service";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Card} from "../models/card.model";
import {CardAddComponent} from "../card-add/card-add.component";

@Component({
  selector: 'app-card',
  standalone: true,
    imports: [FormsModule, HomeComponent, NgOptimizedImage, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  cards: Card[] = [];
  imgUrl: string;
  constructor(
    private cardService: CardService
  ) { this.imgUrl = this.cardService.imgUrl; }

  ngOnInit(): void {
    this.getCards();
  }
   getCards(): void {
     this.cardService.getCards().subscribe((data: Card[]) => {
      this.cards = data;
    })
  }

  protected readonly CardAddComponent = CardAddComponent;
  protected readonly CardService = CardService;
}
