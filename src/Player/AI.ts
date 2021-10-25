import { Weight, weight } from '../Rules/Weight';
import Card from '../Card';
import Deck from '../Deck';
import Player from './Player';
import Shithead from '../Shithead';
import ValidateMove from '../Rules/ValidateMove';
import { beats } from '../Rules/Beats';
import { instance as ruleRegistryInstance } from '@civ-clone/core-rule/RuleRegistry';
import { value } from '../Rules/Check';

export class AI extends Player {
  swapDeck(): Promise<void> {
    return new Promise((resolve) => {
      const swapDeck = new Deck(this.faceUp.empty(), this.hand.empty());

      swapDeck.sort((a, b) => {
        const [weightA, weightB] = [a, b].map((card) =>
          ruleRegistryInstance.process(Weight, a).shift()
        );

        return weightA - weightB;
      });

      this.faceUp.push(swapDeck.pop(3));
      this.hand = swapDeck.empty();

      resolve();
    });
  }

  play(game: Shithead): Promise<Deck> {
    const discardPile = game.discard;

    return new Promise((resolve) => {
      const playing = new Deck();

      if (this.hand.length === 0 && this.faceUp.length) {
        const [chosen] = this.faceUp
          .peek()
          .map((card): [Card, number] => [card, weight(card)])
          .filter(([card]) => beats(card, discardPile))
          .sort(([, valueA], [, valueB]) => valueA - valueB)
          .map(([card]) => card)
          // Add the bottom card in case there isn't a "winning" card.
          .concat(this.faceUp.peek());

        this.hand.push(this.faceUp.remove(chosen));
      } else if (this.hand.length === 0 && this.faceDown.length) {
        this.hand.push(this.faceDown.pop());
      }

      const [primary, ...otherCandidates] = this.hand
        .sort((a, b) => {
          const [valueA, valueB] = [a, b].map((card) =>
            value(card, discardPile)
          );

          return valueA - valueB;
        })
        .peek()
        .filter((card) => beats(card, discardPile));

      if (primary) {
        playing.push(this.hand.remove(primary));
      } else {
        playing.push(this.hand.pop());
      }

      otherCandidates.forEach((card) => {
        const cardValue = value(card, discardPile);

        if (cardValue > 12) {
          return;
        }

        const valid = ruleRegistryInstance
          .process(ValidateMove, new Deck(...playing.peek(), card), this, game)
          .every((valid) => valid);

        if (valid) {
          playing.push(this.hand.remove(card));
        }
      });

      resolve(playing);
    });
  }
}

export default AI;
