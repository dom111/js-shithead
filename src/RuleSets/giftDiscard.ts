import Card from '../Card';
import Criterion from '@civ-clone/core-rule/Criterion';
import Deck from '../Deck';
import Effect from '@civ-clone/core-rule/Effect';
import PickedUp from '../Rules/PickedUp';
import Shithead from '../Shithead';
import ValidateMove from '../Rules/ValidateMove';
import Check from '../Rules/Check';
import { noCard } from '../playingCards';
import Weight from '../Rules/Weight';

// TODO
// {
//   cards: ['*1', '*2'],
//   name: 'Give them to someone',
//   value: 20,
//   played: function (game, player, card, played) {
//     game.burnt.push(game.discard.remove(card));
//   },
//   check: function (game, player, card, played) {
//     return ['*1', '*2', 'TC', 'TD', 'TH', 'TS'].includes(played.id);
//   },
//   action: function (game, player, card, played) {
//     var targetPlayer;
//
//     if (player.type == 'Human') {
//       if (game.players.length == 2) {
//         targetPlayer = targetPlayer = game.players.filter(function (
//           otherPlayer
//         ) {
//           return otherPlayer.id != player.id;
//         })[0];
//       }
//
//       while (typeof targetPlayer === 'undefined') {
//         targetPlayer =
//           game.players[
//             prompt('Enter player number to give them to:') - 1
//           ];
//       }
//     } else {
//       targetPlayer = game.players
//         .filter(function (otherPlayer) {
//           return otherPlayer.id != player.id;
//         })
//         .sort(function (a, b) {
//           return (
//             b.hand.length +
//             b.faceUp.length +
//             b.faceDown.length -
//             (a.hand.length + a.faceUp.length + a.faceDown.length)
//           );
//         })[0];
//     }
//
//     game.turn +=
//       targetPlayer.id +
//       game.players.length * (targetPlayer.id < player.id) -
//       player.id -
//       1;
//   },
// },

export const getRules = (
  cards: string[] = ['*1', '*2'],
  value: number = 16,
  weight: number = 45
) => [
  new Check(
    new Criterion((card: Card) => cards.includes(card.getId())),
    new Effect(() => value)
  ),

  new PickedUp(
    new Effect((pickedUp: Deck, game: Shithead) => {
      pickedUp
        .peek()
        .filter((card: Card) => cards.includes(card.getId()))
        .forEach((card) => game.burnt.push(pickedUp.remove(card)));
    })
  ),

  // TODO: handle this
  // new Played(
  //     new Criterion((played: Deck, player: Player, game: Shithead) => {
  //         const jokers = cardRegistryInstance.filter((card: Card) => ['*1', '*2'].includes(card.getId()));
  //
  //         return jokers.some((joker) => played.includes(joker));
  //     }),
  //     new Effect((played: Deck, player: Player, game: Shithead) => {
  //
  //     }),
  // ),

  // new ValidateMove(
  //   new Effect(
  //     (played: Deck) => !cards.includes((played.top() || noCard).getId())
  //   )
  // ),

  new Weight(
    new Criterion((card: Card) => cards.includes(card.getId())),
    new Effect(() => weight)
  ),
];

export default getRules;
