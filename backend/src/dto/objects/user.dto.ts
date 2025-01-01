import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

import { UserEntity } from "@entity/user.entity";

export class newUserDTO
  implements Omit<UserEntity, "balance" | "id" | "setPassword">
{
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name can't be empty" })
  public name: string;

  @IsEmail({}, { message: "Email must be valid email" })
  public email: string;

  @Length(5, 60, { message: "Password must be between 5 to 60 length" })
  public password: string;
}
