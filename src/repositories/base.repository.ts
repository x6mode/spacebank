import { Entity } from "@entity/base.entity";

export interface IBaseRepository<T extends Entity> {
  findById(id: string): T | null;
  create(entity: T): T;
}

export abstract class BaseRepository<T extends Entity>
  implements IBaseRepository<T>
{
  protected store: Map<T["id"], T> = new Map();

  public findById = (id: T["id"]): T | null => {
    return this.store.get(id);
  };

  public create(entity: T): T {
    return this.store.set(entity.id, entity).get(entity.id);
  }
}
