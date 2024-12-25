export abstract class Entity {
  public id: string;

  constructor() {
    this.id = crypto.randomUUID();
  }
}
