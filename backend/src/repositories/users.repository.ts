import { Injectable } from "@nestjs/common";

import { newUserDTO } from "@dto/user.dto";

import { UserEntity } from "@entity/user.entity";

import { BaseRepository } from "@repository/base.repository";

export interface IUsersRepository {
  createWithDTO(user: newUserDTO): UserEntity;
}

@Injectable()
export class UsersRepository
  extends BaseRepository<UserEntity>
  implements IUsersRepository
{
  public createWithDTO(user: newUserDTO): UserEntity {
    const newUser = new UserEntity();

    newUser.email = user.email;
    newUser.name = user.name;
    newUser.balance = 0;
    newUser.setPassword(user.password);

    return this.create(newUser);
  }
}
