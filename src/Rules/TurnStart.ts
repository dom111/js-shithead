import Player from '../Player/Player';
import Rule from '@civ-clone/core-rule/Rule';
import Shithead from '../Shithead';

export class TurnStart extends Rule<[Player, Shithead, number]> {}

export default TurnStart;
