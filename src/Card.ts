import Group from './Group';

export type CardDetails = {
  id: string;
  name?: null | string;
  value: number;
  group?: null | Group;
  title?: null | string;
};

export interface ICard {
  getId(): string;
  getName(): null | string;
  getValue(): number;
  getGroup(): null | Group;
  getTitle(): null | string;
  toString(): string;
}

export class Card implements ICard {
  private id: string;
  private name: null | string;
  private value: number;
  private group: null | Group;
  private title: null | string;

  constructor({
    id,
    name = null,
    value,
    group = null,
    title = null,
  }: CardDetails) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.group = group;
    this.title = title;
  }

  getId(): string {
    return this.id;
  }

  getName(): null | string {
    return this.name;
  }

  getValue(): number {
    return this.value;
  }

  getGroup(): null | Group {
    return this.group;
  }

  getTitle(): null | string {
    return this.title;
  }

  toString(): string {
    if (this.title !== null) {
      return this.title;
    }

    if (this.group !== null) {
      return `${this.title || this.name || this.value} of ${
        this.group.getTitle() || this.group.getName()
      }`;
    }

    return this.title || this.name || this.id;
  }
}

export default Card;
