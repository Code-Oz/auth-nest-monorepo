import { ApiProperty } from "@nestjs/swagger"

export const postRegisterResponseMessage = "User has been registered !"

export class PostRegisterResponse201 {
    @ApiProperty({
        example: postRegisterResponseMessage,
    })
    message: string
}
