import { IsNotEmpty, MinLength } from "class-validator"

export class ChangePasswordDto {

  @IsNotEmpty()
  changePasswordToken: string

  @IsNotEmpty()
  @MinLength(6)
  password: string

}
