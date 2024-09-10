import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink, Router} from "@angular/router";
import {NgForOf, NgOptimizedImage} from "@angular/common";

import {HomeComponent} from "../home/home.component";
import {Card} from "../models/card.model";
import {CardService} from "../card/card.service";
import {Perk} from "../models/perk.model";

@Component({
  selector: 'app-card-edit',
  standalone: true,
  imports: [
    HomeComponent,
    NgForOf,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './card-edit.component.html',
  styleUrl: './card-edit.component.css'
})

export class CardEditComponent implements OnInit {
  card: Card | undefined;
  perks: Perk[] | undefined;
  imgUrl: string;

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router,
  ) {this.imgUrl = this.cardService.imgUrl}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.getCard(id);
  }

  getCard(id: number) {
    this.cardService.getCardById(id).subscribe((data: any) => {
      this.card = data[1];
      this.perks = data[0];
    })
  }

  deleteCard() {
    const id = Number(this.route.snapshot.params['id']);
    this.cardService.deleteCard(id).subscribe(response => {
      this.router.navigate(['/cards']).then(r => alert(response));
    });
  }
}
