import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class UserConnectionDto {
  @ApiProperty({
    description: "Must be an email",
    example: "toto@toto.fr",
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: "Password of user for login",
    example: "123456",
    minimum: 1,
  })
  @IsNotEmpty()
  password: string

}
