import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../card.service';
import {PerksService} from "../../services/perks.service";
import { Card } from '../card.model';
import {Perk} from "../../shared/models/perk.model";
import { FormsModule } from '@angular/forms';

import { HomeComponent } from '../../home/home.component';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.css'],
  standalone: true,
  imports: [FormsModule, HomeComponent, CommonModule]
})

export class CardAddComponent implements OnInit {
  card: Card = { id: 0, name: '', perks: [] as number[], image: null};
  perks: Perk[] = [];
  selectedFile: File | null = null;

  constructor(
    private cardService: CardService,
    private perkService: PerksService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPerks();
  }

  getPerks(): void {
    this.perkService.getPerks().subscribe((data: Perk[]) => {
      this.perks = data;
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onPerkChange(event: Event, perkId: number): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.card.perks.push(perkId);
    } else {
      const index = this.card.perks.indexOf(perkId);
      if (index > -1) {
        this.card.perks.splice(index, 1);
      }
    }
  }

  isPerkSelected(perkId: number): boolean {
    return this.card.perks.includes(perkId);
  }

  add(): void {
    const formData = new FormData();
    formData.append('name', this.card.name);

    this.card.perks.forEach((perkId) => {
      formData.append('perks[]', perkId.toString());
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.cardService.addCard(formData).subscribe(() => this.router.navigate(['/cards']));
  }
}
