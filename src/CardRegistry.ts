import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import Card from './Card';

export interface ICardRegistry<
  T extends Card = Card,
  P extends any[] = any[],
  R = any
> extends IEntityRegistry<T> {
  getById(id: string): null | T;
}

export class CardRegistry<
    T extends Card = Card,
    P extends any[] = any[],
    R = any
  >
  extends EntityRegistry
  implements ICardRegistry<T>
{
  constructor() {
    super(Card);
  }

  getById(id: string): null | T {
    const [card] = this.getBy('id', id);

    return card ?? null;
  }
}

export const instance: CardRegistry = new CardRegistry();

export default CardRegistry;
