import { ApiProperty } from "@nestjs/swagger"
import { MessageResponse } from "../../../types/message-response.types"

export class MessageErrorPostRegister extends MessageResponse {
    @ApiProperty({
        example: "User already register",
    })
    message: string

}
