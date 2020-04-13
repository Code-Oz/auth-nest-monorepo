import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class UserRegisterDto {
  @ApiProperty({
    description: "Must be an email",
    example: "toto@toto.fr",
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: "Password of user",
    minimum: 6,
    example: "123456",
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string

}
