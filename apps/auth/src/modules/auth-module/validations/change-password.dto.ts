import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, MinLength } from "class-validator"

export class ChangePasswordDto {
  @ApiProperty({
    description: "Password of user",
    minimum: 6,
    example: "123456",
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string

}
