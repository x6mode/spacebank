import { Module } from "@nestjs/common";

import { UsersController } from "./users.controller";

import { UsersService } from "./users.service";

import { UsersRepository } from "@repository/users.repository";

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
