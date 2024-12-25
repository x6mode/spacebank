import { UserEntity } from "@entity/user.entity";

import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TransactionSchema {
  @IsNotEmpty({ message: "userFrom cant be null" })
  @IsString({ message: "userFrom can be only type string" })
  public userFrom: UserEntity["id"];

  @IsNotEmpty({ message: "userTo cant be null" })
  @IsString({ message: "userTo can be only type string" })
  public userTo: UserEntity["id"];

  @IsNotEmpty({ message: "vault cant be null" })
  @IsNumber({}, { message: "vault can be only type number" })
  public vault: number;
}
