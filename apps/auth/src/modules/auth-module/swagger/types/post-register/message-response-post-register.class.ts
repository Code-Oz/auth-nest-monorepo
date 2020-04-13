import { ApiProperty } from "@nestjs/swagger"
import { MessageResponse } from "../../../types/message-response.types"

export class MessageResponsePostRegister extends MessageResponse {
    @ApiProperty({
        example: "User has been register",
    })
    message: string

}
