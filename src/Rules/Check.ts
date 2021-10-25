import Card from '../Card';
import Deck from '../Deck';
import Rule from '@civ-clone/core-rule/Rule';
import { instance as ruleRegistryInstance } from '@civ-clone/core-rule/RuleRegistry';
import { noCard } from '../playingCards';
import Beats from './Beats';

export class Check extends Rule<[Card, Deck], number> {}

export const value = (card: Card, pile: Deck): number =>
  ruleRegistryInstance.process(Check, card, pile).shift();

export default Check;
