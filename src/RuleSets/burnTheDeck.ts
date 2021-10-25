import Card from '../Card';
import Check from '../Rules/Check';
import Criterion from '@civ-clone/core-rule/Criterion';
import Deck from '../Deck';
import Effect from '@civ-clone/core-rule/Effect';
import Played from '../Rules/Played';
import Shithead from '../Shithead';
import Weight from '../Rules/Weight';

export const getRules = (
  cards: string[] = ['TC', 'TD', 'TH', 'TS'],
  value: number = 15,
  weight: number = 50
) => [
  new Check(
    new Criterion((card: Card) => cards.includes(card.getId())),
    new Effect(() => value)
  ),

  new Played(
    new Criterion((played: Deck) =>
      played.peek().some((card) => cards.includes(card.getId()))
    ),
    new Effect((played, player, game: Shithead) =>
      game.burnt.push(game.discard.empty())
    )
  ),

  new Weight(
    new Criterion((card: Card) => cards.includes(card.getId())),
    new Effect(() => weight)
  ),
];

export default getRules;
