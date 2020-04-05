import { IsEmail, IsNotEmpty } from "class-validator"

export class UserConnectionDto {
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string

}
