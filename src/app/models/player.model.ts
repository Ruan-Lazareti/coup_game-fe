import {Card} from "./card.model";

export class Player {
  name: string;
  session_id: string;
  coins: number;

  constructor(name: string, session_id: string, coins: number) {
    this.name = name;
    this.session_id = session_id;
    this.coins = coins;
  }
}