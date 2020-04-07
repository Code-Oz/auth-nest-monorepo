import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class UserConnectionDto {
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(6)
  password: string

}
