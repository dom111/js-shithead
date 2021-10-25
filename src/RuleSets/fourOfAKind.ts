import Criterion from '@civ-clone/core-rule/Criterion';
import Deck from '../Deck';
import Effect from '@civ-clone/core-rule/Effect';
import Played from '../Rules/Played';
import Player from '../Player/Player';
import Shithead from '../Shithead';
import { noCard } from '../playingCards';
import And from '@civ-clone/core-rule/Criteria/And';

export const getRules = () => [
  new Played(
    new And(
      new Criterion((played: Deck, player: Player, game: Shithead) =>
        game.discard
          .peek(4)
          .every(
            (card) =>
              card.getId()[0] === (game.discard.top() || noCard).getId()[0]
          )
      ),
      new Criterion(
        (played: Deck, player: Player, game: Shithead) =>
          game.discard.length >= 4
      )
    ),
    new Effect((played: Deck, player: Player, game: Shithead) =>
      game.burnt.push(game.discard.empty())
    )
  ),
];

export default getRules;
