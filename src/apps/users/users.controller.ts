import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { UserEntity } from "@entity/user.entity";

import { UsersService } from "./users.service";

import { newUserDTO } from "@dto/user.dto";

@Controller("/api/users/")
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Get("/:userId/")
  @HttpCode(HttpStatus.OK)
  public getUserById(@Param("userId") id: UserEntity["id"]) {
    return this.UsersService.getUser(id);
  }

  @Post("/create/")
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  public createUser(@Body() user: newUserDTO) {
    return this.UsersService.createUser(user);
  }
}
