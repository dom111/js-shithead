import Card from './Card';
import { noCard } from './playingCards';

export interface IDeck {
  after(card: Card): Card;
  before(card: Card): Card;
  bottom(): Card;
  canAdd(deck: Card | Card[] | Deck): boolean;
  deal(cards: number, hands: number): Deck[];
  empty(): Deck;
  has(needle: Card): boolean;
  includes(deck: Card | Card[] | Deck): Deck;
  get length(): number;
  peek(n: null | number): Card[];
  pop(cards: number): Deck;
  push(cards: Card | Card[] | Deck): Deck;
  remove(card: Card): Card;
  shift(cards: number): Deck;
  shuffle(): Deck;
  sort(sortFunction: (a: Card, b: Card) => number): Deck;
  top(): Card;
  toString(): string;
  unshift(cards: Card | Card[] | Deck): Deck;
  valueOf(): Card[];
}

export const extractCards = (...stacks: (Card | Card[] | Deck)[]): Card[] => {
  return stacks.reduce((cards: Card[], hand: Card | Card[] | Deck): Card[] => {
    if (hand instanceof Card) {
      cards.push(hand);

      return cards;
    }

    if (hand instanceof Deck) {
      cards.push(...hand.peek());

      return cards;
    }

    cards.push(...hand);

    return cards;
  }, []);
};

export class Deck implements IDeck {
  private cards: Card[] = [];

  constructor(...hands: (Card | Card[] | Deck)[]) {
    this.cards.push(...extractCards(...hands));
  }

  after(card: Card): Card {
    return this.cards[this.cards.indexOf(card) + 1] ?? noCard;
  }

  before(card: Card): Card {
    return this.cards[this.cards.indexOf(card) - 1] ?? noCard;
  }

  bottom(): Card {
    return this.cards[0];
  }

  canAdd(deck: Card | Card[] | Deck): boolean {
    if (deck instanceof Card || deck instanceof Array) {
      deck = new Deck(deck);
    }

    return this.includes(deck).length === 0;
  }

  deal(cards: number, hands: number): Deck[] {
    const total = cards * hands,
      decks: Deck[] = [];

    if (this.cards.length < total) {
      throw new RangeError('Not enough cards in deck.');
    }

    for (let i = 0; i < total; i++) {
      if (!decks[i % hands]) {
        decks[i % hands] = new Deck();
      }

      decks[i % hands].push(this.pop());
    }

    return decks.map((deck) => new Deck(deck));
  }

  empty(): Deck {
    return new Deck(this.cards.splice(0));
  }

  has(needle: Card): boolean {
    return this.cards.some((card) => card.getId() === needle.getId());
  }

  includes(deck: Card | Card[] | Deck): Deck {
    if (deck instanceof Card || deck instanceof Array) {
      deck = new Deck(deck);
    }

    return new Deck(deck.cards.filter((card: Card) => this.has(card)));
  }

  get length(): number {
    return this.cards.length;
  }

  peek(n: null | number = null): Card[] {
    return n === null ? this.cards : this.cards.slice(-n);
  }

  pop(cards: number = 1): Deck {
    if (this.cards.length < cards) {
      throw new RangeError('Not enough cards in deck.');
    }

    return new Deck(this.cards.splice(-cards));
  }

  push(cards: Card | Card[] | Deck): Deck {
    cards = extractCards(cards);

    if (!this.canAdd(cards)) {
      throw new RangeError(
        'Operation would result in duplicate cards in deck, which is disallowed by the current options.'
      );
    }

    this.cards.push(...cards);

    return this;
  }

  remove(card: Card): Card {
    if (!this.has(card)) {
      throw new RangeError(`Card ${card.getId()} is not in the Deck.`);
    }

    this.cards.splice(this.cards.indexOf(card), 1);

    return card;
  }

  shift(cards: number = 1): Deck {
    return new Deck(this.cards.splice(0, cards));
  }

  shuffle(): Deck {
    var shuffled = [];

    while (this.cards.length) {
      shuffled.push(
        ...this.cards.splice(Math.floor(this.cards.length * Math.random()), 1)
      );
    }

    this.cards.push(...shuffled);

    return this;
  }

  sort(sortFunction: (a: Card, b: Card) => number): Deck {
    this.cards.sort(sortFunction);

    return this;
  }

  top(): Card {
    return this.cards[this.length - 1];
  }

  toString(): string {
    return this.cards.map((card) => card.toString()).join(',');
  }

  unshift(cards: Card | Card[] | Deck): Deck {
    if (cards instanceof Card || cards instanceof Array) {
      cards = new Deck(cards);
    }

    if (!this.canAdd(cards)) {
      throw new RangeError(
        'Operation would result in duplicate cards in deck, which is disallowed by the current options.'
      );
    }

    this.cards.unshift(...cards.empty().peek());

    return this;
  }

  valueOf(): Card[] {
    return this.cards;
  }
}

export default Deck;
