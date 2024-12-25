import { Entity } from '@entity/base.entity';

import { hashPassword } from '@util/password-hash';


export class UserEntity extends Entity {
  public password: string
  public name: string;
  public email: string;
  public balance: number;

  public setPassword (unhash: string) {
    this.password = hashPassword(unhash);
  }
}
