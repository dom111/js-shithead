export interface IGroup {
  getName(): string;
}

export type GroupDetails = {
  name: string;
  title?: null | string;
};

export class Group implements IGroup {
  private name: string;
  private title: null | string;

  constructor({ name, title = null }: GroupDetails) {
    this.name = name;
    this.title = title;
  }

  getName(): string {
    return this.name;
  }

  getTitle(): null | string {
    return this.title;
  }
}

export default Group;
