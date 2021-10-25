import { Check, value } from '../Rules/Check';
import Card from '../Card';
import Criterion from '@civ-clone/core-rule/Criterion';
import Deck from '../Deck';
import Effect from '@civ-clone/core-rule/Effect';
import Weight from '../Rules/Weight';
import { noCard } from '../playingCards';

export const previousValue = (cards: string[]) =>
  new Check(
    new Criterion((card: Card) => cards.includes(card.getId())),
    new Effect((card: Card, pile: Deck) =>
      value((pile.has(card) ? pile.before(card) : pile.top()) || noCard, pile)
    )
  );

export const getRules = (
  cards: string[] = ['4C', '4D', '4H', '4S'],
  weight: number = 30
) => [
  previousValue(cards),

  new Weight(
    new Criterion((card) => cards.includes(card.getId())),
    new Effect(() => weight)
  ),
];

export default getRules;
