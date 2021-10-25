import Deck from '../Deck';
import Player from '../Player/Player';

export class InvalidMove extends Error {
  constructor(player: Player, played: Deck) {
    super(`Invalid move: ${player} - ${played.toString()} cannot be played.`);
  }
}

export default InvalidMove;
