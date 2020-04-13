import { ApiProperty } from "@nestjs/swagger"

export class AccessToken {
    @ApiProperty({
        example: "fake access token",
    })
    access_token: string
}
