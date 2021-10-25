import Deck from '../Deck';
import Player from '../Player/Player';
import Rule from '@civ-clone/core-rule/Rule';
import Shithead from '../Shithead';

export class ValidateMove extends Rule<[Deck, Player, Shithead]> {}

export default ValidateMove;
