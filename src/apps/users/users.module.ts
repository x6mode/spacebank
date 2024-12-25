import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';

import { UsersService } from './users.service';

import { UsersRepository } from '@repository/users.repository';

import { BalancesService } from '@apps/balance/balances.service';


@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    BalancesService
  ]
})
export class UsersModule {}
