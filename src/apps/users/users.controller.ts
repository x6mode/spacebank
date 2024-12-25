import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { UserEntity } from '@entity/user.entity';

import { BalancesService } from '@apps/balance/balances.service';
import { UsersService } from './users.service';

import { newUserDTO } from '@dto/user.dto';

import { TransactionSchema } from '@schema/transaction.schema';


@Controller()
export class UsersController {
  constructor (
    private UsersService: UsersService,
    private BalancesService: BalancesService
  ) {}

  @Get('/api/users/:userId/')
  public getUserById (@Param('userId') id: UserEntity['id']) {    
    return this.UsersService.getUser(id);
  }

  @Get('/api/users/:userId/balance/')
  public getWalletForUser (@Param('userId') userId: UserEntity['id'] ): UserEntity['balance'] {
    return this.BalancesService.getUserBalance(userId);
  }

  @Post('/api/users/create/')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  public createUser (@Body() user: newUserDTO ) {
    return this.UsersService.createUser(user);
  }

  @Post('/api/transaction/send')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  public sendVaultToUser (@Body() transaction: TransactionSchema) {
    const { userFrom, userTo, vault } = transaction;

    return this.BalancesService.transferBalanceUserToUser(userFrom, userTo, vault);
  }
}
