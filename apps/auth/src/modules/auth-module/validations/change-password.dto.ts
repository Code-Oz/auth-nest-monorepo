import { IsNotEmpty, MinLength } from "class-validator"

export class ChangePasswordDto {

  @IsNotEmpty()
  @MinLength(6)
  password: string

}
