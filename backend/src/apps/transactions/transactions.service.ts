import { HttpException, Injectable, Logger } from "@nestjs/common";

import { UsersService } from "@apps/users/users.service";

import { TransactionSchema } from "@schemas/transaction.schema";

@Injectable()
export class TransactionsService {
  constructor(private UsersService: UsersService) {}

  public makeTransaction({ userFrom, userTo, vault }: TransactionSchema) {
    const userFromAccount = this.UsersService.getUser(userFrom);

    if (userFromAccount.balance < vault) {
      Logger.verbose(
        `User with ID: ${userFrom} doesn't have balance for transaction`,
      );
      throw new HttpException(
        "User doesnt have neednt vault for make transaction!",
        409,
      );
    }

    const userToAccount = this.UsersService.getUser(userTo);

    userFromAccount.balance -= vault;
    userToAccount.balance += vault;
  }
}
