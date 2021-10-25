import Deck from '../Deck';
import Shithead from '../Shithead';

export interface IPlayer {
  getId(): number;
  getName(): string;
  play(game: Shithead): Promise<Deck>;
  swapDeck(): Promise<void>;
  toString(): string;
}

export type PlayerArgs = {
  id: number;
  name?: null | string;
};

export class Player implements IPlayer {
  protected id: number;
  protected name: string;
  public faceDown: Deck;
  public faceUp: Deck;
  public hand: Deck;
  protected ready: boolean = false;

  constructor({ id, name = null }: PlayerArgs) {
    this.id = id;
    this.name = name ?? `Player ${id}`;
    this.faceDown = new Deck();
    this.faceUp = new Deck();
    this.hand = new Deck();
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  play(game: Shithead): Promise<Deck> {
    throw new Error(`'play' must be implemented.`);
  }

  swapDeck(): Promise<void> {
    throw new Error(`'swapDeck' must be implemented.`);
  }

  toString(): string {
    return (
      this.name +
      ' - Face down cards: [' +
      this.faceDown +
      '], Face up cards: [' +
      this.faceUp +
      '], Hand: [' +
      this.hand +
      ']'
    );
  }
}

export default Player;
