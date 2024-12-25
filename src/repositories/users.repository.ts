import { Injectable } from '@nestjs/common';

import { newUserDTO } from '@dto/user.dto';

import { UserEntity } from '@entity/user.entity';

import { BaseRepository } from '@repository/base.repository';


export interface IUsersRepository {
  createWithDTO(user: newUserDTO): UserEntity['id'];
  changeUserBalance(userId: UserEntity['id'], type: 'add' | 'remove', vault: UserEntity['balance']): void;
}


@Injectable()
export class UsersRepository extends BaseRepository<UserEntity> implements IUsersRepository {
  public createWithDTO(user: newUserDTO): UserEntity['id'] {
    const newUser = new UserEntity();

    newUser.email = user.email;
    newUser.name = user.name;
    newUser.balance = 100;
    newUser.setPassword(user.password);

    const createdUser = this.create(newUser);
        
    return createdUser.id;
  }

  public changeUserBalance (userId: UserEntity['id'], type: 'add' | 'remove', vault: UserEntity['balance']): void {
    const user = this.findById(userId);

    if (type === 'add') {
      user.balance += vault;
    } else {
      user.balance -= vault;
    }
  }
}
