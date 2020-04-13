import { ApiProperty } from "@nestjs/swagger"

export const postLogoutResponseMessage = "User successfully logout"

export class PostLogoutResponse201 {
    @ApiProperty({
        example: postLogoutResponseMessage,
    })
    message: string
}
