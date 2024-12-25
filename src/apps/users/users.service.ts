import { HttpException, Injectable } from '@nestjs/common';

import { newUserDTO } from '@dto/user.dto';

import { UserEntity } from '@entity/user.entity';

import { UsersRepository } from '@repository/users.repository';


@Injectable()
export class UsersService {
  constructor (
    private UsersRepository: UsersRepository
  ) {}

  public getUser(id: UserEntity['id']): UserEntity {
    const foundEntity = this.UsersRepository.findById(id);

    if (! foundEntity) {
      throw new HttpException('This user not found!', 404);
    }

    delete foundEntity.password;

    return foundEntity;
  }

  public createUser(user: newUserDTO): UserEntity['id'] {
    return this.UsersRepository.createWithDTO(user);
  }
}
