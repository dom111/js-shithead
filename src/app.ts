import AI from './Player/AI';
import Human from './Player/Human';
import Shithead from './Shithead';
import acesHigh from './RuleSets/acesHigh';
import burnTheDeck from './RuleSets/burnTheDeck';
import core from './RuleSets/core';
import fourOfAKind from './RuleSets/fourOfAKind';
import giftDiscard from './RuleSets/giftDiscard';
import { instance as ruleRegistryInstance } from '@civ-clone/core-rule/RuleRegistry';
import missAGo from './RuleSets/missAGo';
import reset from './RuleSets/reset';
import seeThrough from './RuleSets/seeThrough';
import Player from './Player/Player';
import Played from './Rules/Played';
import Effect from '@civ-clone/core-rule/Effect';
import Card from './Card';
import TurnStart from './Rules/TurnStart';
import Deck from './Deck';

ruleRegistryInstance.register(
  ...core(),
  ...fourOfAKind(),
  ...reset(),
  ...missAGo(),
  ...acesHigh(),
  ...burnTheDeck(),
  ...giftDiscard(),
  ...seeThrough()
);

let game: Shithead;

const burnt = document.querySelector('.burnt') as Element,
  discard = document.querySelector('.discard') as Element,
  deck = document.querySelector('.deck') as Element,
  players = document.querySelector('.players') as Element;

const newGame = () => {
  game = new Shithead({
    players: [
      new Human({
        id: 1,
        name: 'Player',
      }),
      new AI({
        id: 2,
        name: 'CPU',
      }),
    ],
  });

  game.start();

  game.play().then((player: Player) => {
    if (player instanceof Human) {
      const fireworks = document.createElement('div');

      fireworks.classList.add('pyro');
      fireworks.setAttribute('data-player-name', player.getName());

      const fireworksBefore = document.createElement('div'),
        fireworksAfter = document.createElement('div');

      fireworksBefore.classList.add('before');
      fireworksAfter.classList.add('after');

      fireworks.append(fireworksBefore, fireworksAfter);

      fireworks.addEventListener('click', () => fireworks.remove());

      document.body.append(fireworks);

      return;
    }

    // TODO: flip the table, throw the cards, etc
    alert('Computer won! 😩');
  });
};

const newGameButton = document.querySelector('.new-game');

if (newGameButton === null) {
  throw new TypeError(`Invalid HTML.`);
}

newGameButton.addEventListener('click', () => newGame());

[discard, burnt].forEach((pile) => {
  pile.addEventListener('click', () => {
    const overlay = document.createElement('div'),
      preview = pile.cloneNode(true) as Element;

    overlay.classList.add('overlay');

    preview.classList.remove('pile');
    preview.classList.add('hand');

    overlay.append(preview);

    overlay.addEventListener('click', () => overlay.remove());

    document.body.append(overlay);
  });
});

ruleRegistryInstance.register(
  new Played(
    new Effect((played: Deck, player: Player) => updateDisplay(player))
  ),
  new TurnStart(new Effect((player: Player) => updateDisplay(player)))
);

const updateDisplay = (turnPlayer: Player) => {
  window.requestAnimationFrame(() => {
    const emptyElement = (element: Element) => {
        while (element.hasChildNodes()) {
          (element.firstChild as Element).remove();
        }
      },
      createCard = (card: Card, additionalClasses: string[] = []) => {
        const cardElement = document.createElement('div');

        cardElement.classList.add('card');

        if (additionalClasses.length > 0) {
          cardElement.classList.add(...additionalClasses);
        }

        if (!additionalClasses.includes('face-down')) {
          cardElement.setAttribute('data-card-id', card.getId());
        }

        return cardElement;
      },
      addCards = (
        cards: Card[],
        target: Element,
        additionalClasses: string[] = []
      ) => {
        cards.forEach((card) =>
          target.append(createCard(card, additionalClasses))
        );
      };

    (
      [
        [burnt, game.burnt.peek()],
        [discard, game.discard.peek()],
        [deck, game.deck.peek(), ['face-down']],
      ] as [Element, Card[], string[] | undefined][]
    ).forEach(([target, cards, additionalClasses = []]) => {
      emptyElement(target);
      addCards(cards, target, additionalClasses);
    });

    emptyElement(players);

    game.players.forEach((player) => {
      const faceDown = player.faceDown.peek(),
        faceUp = player.faceUp.peek(),
        createPile = () => {
          const pile = document.createElement('div');

          pile.classList.add('down', 'pile');

          return pile;
        },
        piles = [createPile(), createPile(), createPile()],
        playerContainer = document.createElement('div'),
        hand = document.createElement('div');

      piles.forEach((pile, i) => {
        if (faceDown[i] ?? false) {
          pile.append(createCard(faceDown[i], ['face-down']));
        }

        if (faceUp[i] ?? false) {
          pile.append(createCard(faceUp[i]));
        }
      });

      hand.classList.add('hand');

      const additionalClasses: string[] = [];

      if (player !== turnPlayer || !(player instanceof Human)) {
        additionalClasses.push('face-down');
      }

      if (player.hand.length > 0) {
        player.hand
          .peek()
          .forEach((card) => hand.append(createCard(card, additionalClasses)));
      }

      playerContainer.classList.add('player');
      playerContainer.setAttribute('data-player-name', player.getName());
      playerContainer.setAttribute('data-player-id', player.getId().toString());

      playerContainer.append(...piles, hand);

      players.append(playerContainer);
    });
  });
};

if ('ontouchstart' in document) {
  (document.querySelector('html') as Element).classList.add('has-touch');
}
