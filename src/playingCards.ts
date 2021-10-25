import { Card, CardDetails } from './Card';
import Group from './Group';
import { instance as cardRegistryInstance } from './CardRegistry';

export const Clubs = new Group({ name: 'clubs', title: 'Clubs' }),
  Hearts = new Group({ name: 'hearts', title: 'Hearts' }),
  Diamonds = new Group({ name: 'diamonds', title: 'Diamonds' }),
  Spades = new Group({ name: 'spades', title: 'Spades' });

export const noCard = new Card({ id: '', title: 'The Table', value: 0 });

[
  { id: 'AC', name: 'Ace', value: 1, group: Clubs },
  { id: '2C', name: 'Two', value: 2, group: Clubs },
  { id: '3C', name: 'Three', value: 3, group: Clubs },
  { id: '4C', name: 'Four', value: 4, group: Clubs },
  { id: '5C', name: 'Five', value: 5, group: Clubs },
  { id: '6C', name: 'Six', value: 6, group: Clubs },
  { id: '7C', name: 'Seven', value: 7, group: Clubs },
  { id: '8C', name: 'Eight', value: 8, group: Clubs },
  { id: '9C', name: 'Nine', value: 9, group: Clubs },
  { id: 'TC', name: 'Ten', value: 10, group: Clubs },
  { id: 'JC', name: 'Jack', value: 11, group: Clubs },
  { id: 'QC', name: 'Queen', value: 12, group: Clubs },
  { id: 'KC', name: 'King', value: 13, group: Clubs },

  { id: 'AH', name: 'Ace', value: 1, group: Hearts },
  { id: '2H', name: 'Two', value: 2, group: Hearts },
  { id: '3H', name: 'Three', value: 3, group: Hearts },
  { id: '4H', name: 'Four', value: 4, group: Hearts },
  { id: '5H', name: 'Five', value: 5, group: Hearts },
  { id: '6H', name: 'Six', value: 6, group: Hearts },
  { id: '7H', name: 'Seven', value: 7, group: Hearts },
  { id: '8H', name: 'Eight', value: 8, group: Hearts },
  { id: '9H', name: 'Nine', value: 9, group: Hearts },
  { id: 'TH', name: 'Ten', value: 10, group: Hearts },
  { id: 'JH', name: 'Jack', value: 11, group: Hearts },
  { id: 'QH', name: 'Queen', value: 12, group: Hearts },
  { id: 'KH', name: 'King', value: 13, group: Hearts },

  { id: 'AD', name: 'Ace', value: 1, group: Diamonds },
  { id: '2D', name: 'Two', value: 2, group: Diamonds },
  { id: '3D', name: 'Three', value: 3, group: Diamonds },
  { id: '4D', name: 'Four', value: 4, group: Diamonds },
  { id: '5D', name: 'Five', value: 5, group: Diamonds },
  { id: '6D', name: 'Six', value: 6, group: Diamonds },
  { id: '7D', name: 'Seven', value: 7, group: Diamonds },
  { id: '8D', name: 'Eight', value: 8, group: Diamonds },
  { id: '9D', name: 'Nine', value: 9, group: Diamonds },
  { id: 'TD', name: 'Ten', value: 10, group: Diamonds },
  { id: 'JD', name: 'Jack', value: 11, group: Diamonds },
  { id: 'QD', name: 'Queen', value: 12, group: Diamonds },
  { id: 'KD', name: 'King', value: 13, group: Diamonds },

  { id: 'AS', name: 'Ace', value: 1, group: Spades },
  { id: '2S', name: 'Two', value: 2, group: Spades },
  { id: '3S', name: 'Three', value: 3, group: Spades },
  { id: '4S', name: 'Four', value: 4, group: Spades },
  { id: '5S', name: 'Five', value: 5, group: Spades },
  { id: '6S', name: 'Six', value: 6, group: Spades },
  { id: '7S', name: 'Seven', value: 7, group: Spades },
  { id: '8S', name: 'Eight', value: 8, group: Spades },
  { id: '9S', name: 'Nine', value: 9, group: Spades },
  { id: 'TS', name: 'Ten', value: 10, group: Spades },
  { id: 'JS', name: 'Jack', value: 11, group: Spades },
  { id: 'QS', name: 'Queen', value: 12, group: Spades },
  { id: 'KS', name: 'King', value: 13, group: Spades },

  // { id: 'R', name: 'Rules Card', title: 'Rules Card', value: 0 },
  { id: '*1', name: 'Joker', title: 'Joker', value: 0 },
  { id: '*2', name: 'Joker', title: 'Joker', value: 0 },
].forEach((details: CardDetails) =>
  cardRegistryInstance.register(new Card(details))
);
