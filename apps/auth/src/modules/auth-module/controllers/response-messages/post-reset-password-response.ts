import { ApiProperty } from "@nestjs/swagger"

export const postResetPasswordResponseMessage = (to: string) => `An email has been send to ${to}, if email exist`

export class PostResetPasswordResponse201 {
    @ApiProperty({
        example: postResetPasswordResponseMessage("toto@toto.fr"),
    })
    message: string
}
