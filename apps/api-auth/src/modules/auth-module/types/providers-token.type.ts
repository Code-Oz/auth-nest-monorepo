import { ApiProperty } from "@nestjs/swagger"

export class ProvidersToken {
    @ApiProperty({
        example: "fake access token",
    })
    access_token: string
    @ApiProperty({
        example: "fake refresh token",
    })
    refresh_token: string
}
