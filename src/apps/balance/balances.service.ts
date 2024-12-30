import { HttpException, Injectable, Logger } from "@nestjs/common";

import { UserEntity } from "@entity/user.entity";

import { UsersRepository } from "@repository/users.repository";

@Injectable()
export class BalancesService {
  constructor(private UsersRepository: UsersRepository) {}

  public getUserBalance = (userId: UserEntity["id"]): UserEntity["balance"] => {
    const user = this.UsersRepository.findById(userId);
    const balance = user.balance;

    if (balance === undefined || balance === null) {
      Logger.verbose(`Not found balance for user with ID: ${userId}`);
      throw new HttpException("Not found balance for this user!", 404);
    }

    return balance;
  };

  public transferBalanceUserToUser(
    userFrom: UserEntity["id"],
    userTo: UserEntity["id"],
    vault: UserEntity["balance"],
  ): void {
    const balanceUserFrom = this.getUserBalance(userFrom);

    if (balanceUserFrom < vault) {
      Logger.verbose(`User with ID: ${userFrom} doesn't have balance for transaction`);
      throw new HttpException(
        "User doesnt have neednt vault for make transaction!",
        409,
      );
    }

    this.UsersRepository.changeUserBalance(userFrom, "remove", vault);
    this.UsersRepository.changeUserBalance(userTo, "add", vault);
  }
}
