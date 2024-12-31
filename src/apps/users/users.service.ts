import { HttpException, Injectable, Logger } from "@nestjs/common";

import { newUserDTO } from "@dto/user.dto";
import { TransactionSchema } from "src/schemas/transaction.schema";

import { UserEntity } from "@entity/user.entity";

import { UsersRepository } from "@repository/users.repository";

@Injectable()
export class UsersService {
  constructor(private UsersRepository: UsersRepository) {}

  public getUser(id: UserEntity["id"]): UserEntity {
    const foundEntity = this.UsersRepository.findById(id);

    if (!foundEntity) {
      Logger.verbose(`User with ID: ${id} is not found!`, "UsersService");
      throw new HttpException("This user not found!", 404);
    }

    delete foundEntity.password;

    return foundEntity;
  }

  public createUser(dto: newUserDTO): UserEntity["id"] {
    return this.UsersRepository.createWithDTO(dto);
  }

  public makeTransactionToUser({ userFrom, userTo, vault }: TransactionSchema) {
    const userFromAccount = this.getUser(userFrom);

    if (userFromAccount.balance < vault) {
      Logger.verbose(
        `User with ID: ${userFrom} doesn't have balance for transaction`,
        "BalancesService",
      );

      throw new HttpException(
        "User doesnt have need vault for make transaction!",
        409,
      );
    }

    const userToAccount = this.getUser(userTo);

    userFromAccount.balance -= vault;
    userToAccount.balance += vault;
  }
}
