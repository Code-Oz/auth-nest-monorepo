import { ApiProperty } from "@nestjs/swagger"
import { IsEmail } from "class-validator"

export class UserEmailDto {
    @ApiProperty({
        description: "Must be an email",
        example: "toto@toto.fr",
    })
    @IsEmail()
    email: string
}
