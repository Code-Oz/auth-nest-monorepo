import { ApiProperty } from "@nestjs/swagger"

export const postChangePasswordResponseMessage = "User password has been changed !"

export class PostChangePasswordResponse201 {
    @ApiProperty({
        example: postChangePasswordResponseMessage,
    })
    message: string
}
