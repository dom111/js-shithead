import Deck from './Deck';
import InvalidMove from './Error/InvalidMove';
import Played from './Rules/Played';
import Player from './Player/Player';
import ValidateMove from './Rules/ValidateMove';
import { instance as cardRegistryInstance } from './CardRegistry';
import { instance as ruleRegistryInstance } from '@civ-clone/core-rule/RuleRegistry';
import TurnStart from './Rules/TurnStart';

export interface IShithead {
  advanceTurn(): number;
  play(): Promise<Player>;
  setWinner(player: Player): void;
  start(): void;
}

export type ShitheadArgs = {
  players: Player[];
};

export class Shithead implements IShithead {
  public burnt: Deck = new Deck();
  public deck: Deck;
  public discard: Deck = new Deck();
  public players: Player[] = [];
  private turn: number = 0;
  public winner: null | Player = null;

  constructor(args: ShitheadArgs) {
    this.deck = new Deck(...cardRegistryInstance.entries());

    this.deck.shuffle();

    this.players.push(...args.players);
  }

  advanceTurn(n = 1): number {
    return (this.turn += n);
  }

  play(): Promise<Player> {
    return new Promise(async (resolve, reject) => {
      while (!this.winner) {
        const currentPlayer = this.players[this.turn % this.players.length];

        ruleRegistryInstance.process(TurnStart, currentPlayer, this, this.turn);

        let played;

        try {
          played = await currentPlayer.play(this);

          if (
            !ruleRegistryInstance
              .process(ValidateMove, played, currentPlayer, this)
              .every((value) => value)
          ) {
            throw new InvalidMove(currentPlayer, played);
          }
        } catch (e) {
          console.error(e);

          continue;
        }

        ruleRegistryInstance.process(Played, played, currentPlayer, this);
      }

      resolve(this.winner);
    });
  }

  setWinner(player: Player): void {
    this.winner = player;
  }

  start(): void {
    this.players.forEach((player) => {
      const [hand, faceDown, faceUp] = this.deck.deal(3, 3);

      player.hand.push(hand);
      player.faceDown.push(faceDown);
      player.faceUp.push(faceUp);
    });

    this.players.forEach(async (player) => await player.swapDeck());
  }
}

export default Shithead;
