import Beats from '../Rules/Beats';
import Effect from '@civ-clone/core-rule/Effect';
import { Check } from '../Rules/Check';
import Criterion from '@civ-clone/core-rule/Criterion';
import Card from '../Card';
import Weight from '../Rules/Weight';

export const getRules = (
  cards: string[] = ['2C', '2D', '2H', '2S'],
  weight: number = 15
) => [
  new Beats(new Effect((played) => cards.includes(played.getId()))),

  new Check(
    new Criterion((card: Card) => cards.includes(card.getId())),
    new Effect(() => 0)
  ),

  new Weight(
    new Criterion((card: Card) => cards.includes(card.getId())),
    new Effect(() => weight)
  ),
];

export default getRules;
