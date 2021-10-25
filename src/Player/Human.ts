import Deck from '../Deck';
import InvalidMove from '../Error/InvalidMove';
import Player from './Player';
import Shithead from '../Shithead';
import ValidateMove from '../Rules/ValidateMove';
import Weight from '../Rules/Weight';
import { instance as cardRegistryInstance } from '../CardRegistry';
import { instance as ruleRegistryInstance } from '@civ-clone/core-rule/RuleRegistry';
import { noCard } from '../playingCards';

export class Human extends Player {
  swapDeck(): Promise<void> {
    return new Promise((resolve) => {
      const swapDeck = new Deck(this.faceUp.empty(), this.hand.empty());

      swapDeck.sort((a, b) => {
        const [weightA, weightB] = [a, b].map((card) =>
          ruleRegistryInstance.process(Weight, card).shift()
        );

        return weightA - weightB;
      });

      this.faceUp.push(swapDeck.pop(3));
      this.hand = swapDeck.empty();

      resolve();
    });
  }

  play(game: Shithead): Promise<Deck> {
    return new Promise((resolve, reject) => {
      const clickHandler = (event: Event) => {
          if (
            (event instanceof MouseEvent && event.button === 2) ||
            (event instanceof TouchEvent && event.touches.length > 1)
          ) {
            if (event instanceof MouseEvent) {
              event.preventDefault();
              event.stopPropagation();
            }

            commitMove();

            return;
          }

          const el = event.target;

          if (
            !(el instanceof Element) ||
            !el.matches('.player .card') ||
            (this.hand.length && !el.matches('.player .hand .card'))
          ) {
            return;
          }

          el.classList.toggle('chosen');
        },
        contextMenuHandler = (event: MouseEvent) => {
          event.stopPropagation();
          event.preventDefault();
        },
        removeEvents = () => {
          ['touchstart', 'mousedown'].forEach((eventName) =>
            document.removeEventListener(eventName, clickHandler)
          );

          document.body.removeEventListener('contextmenu', contextMenuHandler);
        },
        commitMove = () => {
          const playing = new Deck(),
            targets = (
              Array.from(
                document.querySelectorAll(
                  this.hand.length
                    ? `[data-player-id="${this.id}"] .hand .card.chosen`
                    : this.faceUp.length
                    ? `[data-player-id="${this.id}"] .card.chosen:not(.face-down)`
                    : `[data-player-id="${this.id}"] .card.chosen`
                )
              ) as HTMLElement[]
            ).map(
              (cardElement) =>
                cardRegistryInstance.getById(
                  // TODO: this doesn't work for the faceDown cards as they don't have an ID set!
                  cardElement.dataset.cardId ?? ''
                ) || noCard
            );

          playing.push(targets);

          removeEvents();

          if (
            !(
              targets.every((card) => this.hand.has(card)) ||
              targets.every((card) => this.faceUp.has(card)) ||
              targets.every((card) => this.faceDown.has(card))
            ) ||
            playing.length === 0 ||
            !ruleRegistryInstance
              .process(ValidateMove, playing, this, game)
              .every((value) => value)
          ) {
            reject(new InvalidMove(this, playing));

            return;
          }

          playing.peek().forEach((card) => {
            if (this.hand.has(card)) {
              this.hand.remove(card);

              return;
            }

            if (this.faceUp.has(card)) {
              this.faceUp.remove(card);

              return;
            }

            this.faceDown.remove(card);
          });

          resolve(playing);
        };

      document.body.addEventListener('contextmenu', contextMenuHandler);

      ['touchstart', 'mousedown'].forEach((eventName) => {
        removeEvents();

        document.addEventListener(eventName, clickHandler);
      });
    });
  }
}

export default Human;
