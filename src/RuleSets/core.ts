import { Beats, beats } from '../Rules/Beats';
import { Check, value } from '../Rules/Check';
import Card from '../Card';
import Criterion from '@civ-clone/core-rule/Criterion';
import Deck from '../Deck';
import Effect from '@civ-clone/core-rule/Effect';
import High from '@civ-clone/core-rule/Priorities/High';
import Low from '@civ-clone/core-rule/Priorities/Low';
import PickedUp from '../Rules/PickedUp';
import Played from '../Rules/Played';
import Player from '../Player/Player';
import Shithead from '../Shithead';
import ValidateMove from '../Rules/ValidateMove';
import Weight from '../Rules/Weight';
import { instance as ruleRegistryInstance } from '@civ-clone/core-rule/RuleRegistry';
import { noCard } from '../playingCards';
import And from '@civ-clone/core-rule/Criteria/And';

export const getRules = () => [
  new Beats(
    new Effect((played, pile) => {
      const [toBeatValue, playedValue] = [pile.top() || noCard, played].map(
        (card) => value(card, pile)
      );

      return playedValue >= toBeatValue;
    })
  ),

  new Check(new Low(), new Effect((card: Card) => card.getValue())),

  new Played(
    new High(),
    new Criterion((played: Deck, player: Player, game: Shithead) =>
      played.peek().every((card) => beats(card, game.discard))
    ),
    new Effect((played: Deck, player: Player, game: Shithead) =>
      game.discard.push(played.peek())
    )
  ),
  new Played(
    new High(),
    new Criterion(
      (played: Deck, player: Player, game: Shithead) =>
        played.top() !== game.discard.top()
    ),
    new Criterion(
      (played: Deck, player: Player, game: Shithead) =>
        !played.peek().every((card) => beats(card, game.discard))
    ),
    new Effect((played: Deck, player: Player, game: Shithead) => {
      const pickingUp = game.discard.empty();

      ruleRegistryInstance.process(PickedUp, pickingUp, game);

      player.hand.push(pickingUp);
    })
  ),
  new Played(
    new High(),
    new And(
      new Criterion(
        (played: Deck, player: Player, game: Shithead) => player.hand.length < 3
      ),
      new Criterion(
        (played: Deck, player: Player, game: Shithead) => game.deck.length > 0
      )
    ),
    new Effect((played, player, game: Shithead) =>
      player.hand.push(
        game.deck.pop(Math.min(3 - player.hand.length, game.deck.length))
      )
    )
  ),
  new Played(
    new Criterion(
      (played: Deck, player: Player, game: Shithead) =>
        player.hand.length === 0 &&
        player.faceUp.length === 0 &&
        player.faceDown.length === 0
    ),
    new Effect((played: Deck, player: Player, game: Shithead) =>
      game.setWinner(player)
    )
  ),
  new Played(
    new Effect((played: Deck, player: Player, game: Shithead) =>
      game.advanceTurn()
    )
  ),

  new Weight(new Low(), new Effect((card: Card) => card.getValue())),

  // new ValidateMove(
  //   new Effect((played: Deck, player: Player) =>
  //     (player.hand.length > 0 && played.peek().every((card) => player.hand.has(card))) ||
  //     (player.hand.length === 0 && player.faceUp.length > 0 && played.peek().every((card) => player.faceUp.has(card))) ||
  //     (player.hand.length === 0 && player.faceUp.length === 0 && played.peek().every((card) => player.faceDown.has(card)))
  //   )
  // ),
  new ValidateMove(
    new Effect((played: Deck) =>
      played
        .peek()
        .every(
          (card) => card.getId()[0] === (played.top() || noCard).getId()[0]
        )
    )
  ),
];

export default getRules;
