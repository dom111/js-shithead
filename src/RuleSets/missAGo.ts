import Criterion from '@civ-clone/core-rule/Criterion';
import Deck from '../Deck';
import Effect from '@civ-clone/core-rule/Effect';
import Played from '../Rules/Played';
import Player from '../Player/Player';
import Shithead from '../Shithead';
import Weight from '../Rules/Weight';
import { previousValue } from './seeThrough';

export const getRules = (
  cards: string[] = ['8C', '8D', '8H', '8S'],
  weight: number = 20
) => [
  previousValue(cards),

  new Played(
    new Criterion((played: Deck) =>
      played.peek().some((card) => cards.includes(card.getId()))
    ),
    new Effect((played: Deck, player: Player, game: Shithead) =>
      game.advanceTurn(
        played.peek().filter((card) => cards.includes(card.getId())).length
      )
    )
  ),

  new Weight(
    new Criterion((card) => cards.includes(card.getId())),
    new Effect(() => weight)
  ),
];

export default getRules;
