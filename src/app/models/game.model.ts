import { Card } from './card.model';

export interface Game {
  id: number;
  status: string; // Exemplo: 'ongoing', 'finished'
  cards: Card[];
  currentPlayer: number;
}
