import Card from '../Card';
import Check from '../Rules/Check';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import Weight from '../Rules/Weight';

const isAce = new Criterion((card: Card) =>
  ['AC', 'AD', 'AH', 'AS'].includes(card.getId())
);

export const getRules = (value: number = 14, weight: number = 30) => [
  new Check(isAce, new Effect(() => value)),

  new Weight(isAce, new Effect(() => weight)),
];

export default getRules;
