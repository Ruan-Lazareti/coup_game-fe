import {Card} from "./card.model";

export class Player {
  name: string;
  session_id: string;

  constructor(name: string, session_id: string) {
    this.name = name;
    this.session_id = session_id;
  }
}