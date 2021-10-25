import Card from '../Card';
import Deck from '../Deck';
import Rule from '@civ-clone/core-rule/Rule';
import { instance as ruleRegistryInstance } from '@civ-clone/core-rule/RuleRegistry';
import { noCard } from '../playingCards';
import Beats from './Beats';

export class Weight extends Rule<[Card], number> {}

export const weight = (card: Card): number =>
  ruleRegistryInstance.process(Weight, card).shift();

export default Weight;
