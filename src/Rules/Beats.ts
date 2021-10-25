import Card from '../Card';
import Deck from '../Deck';
import Rule from '@civ-clone/core-rule/Rule';
import { instance as ruleRegistryInstance } from '@civ-clone/core-rule/RuleRegistry';

export class Beats extends Rule<[Card, Deck], boolean> {}

export const beats = (card: Card, pile: Deck): boolean =>
  ruleRegistryInstance.process(Beats, card, pile).some((beats) => beats);

export default Beats;
