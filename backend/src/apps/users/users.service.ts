import { HttpException, Injectable, Logger } from "@nestjs/common";

import { newUserDTO } from "@dto/user.dto";

import { UserEntity } from "@entity/user.entity";

import { UsersRepository } from "@repository/users.repository";

@Injectable()
export class UsersService {
  constructor(private UsersRepository: UsersRepository) {}

  public getUser(id: UserEntity["id"], showPassword?: boolean): UserEntity {
    const foundEntity = this.UsersRepository.findById(id);

    if (!foundEntity) {
      Logger.verbose(`User with ID: ${id} is not found!`, "UsersService");
      throw new HttpException("This user not found!", 404);
    }

    if ( !showPassword ) delete foundEntity.password;

    return foundEntity;
  }

  public createUser(dto: newUserDTO): Omit<UserEntity, 'password'> {
    const createdUser = this.UsersRepository.createWithDTO(dto);
    delete createdUser.password;

    return createdUser;
  }
}
