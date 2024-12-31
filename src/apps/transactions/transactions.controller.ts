import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { TransactionSchema } from "@schema/transaction.schema";

import { TransactionsService } from "./transactions.service";

@Controller("/api/transaction/")
export class TransactionsController {
  constructor(private TransactionsService: TransactionsService) {}

  @Post("/make/")
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  public makeTransactionToUser(@Body() transaction: TransactionSchema) {
    const { userFrom, userTo, vault } = transaction;

    return this.TransactionsService.makeTransaction({
      userFrom,
      userTo,
      vault,
    });
  }
}
