export interface Game {
  players: string[]; // Lista de jogadores pelo nickname
  currentPlayer: string | null; // Jogador atual
  status: 'waiting' | 'in_progress' | 'finished'; // Status do jogo
}
