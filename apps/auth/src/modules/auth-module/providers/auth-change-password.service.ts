import { Injectable } from "@nestjs/common"

import { PasswordTokenPayload } from "@lib/jwt-password-token"
import { UserService } from "@lib/user"

import { ChangePasswordDto } from "../validations/change-password.dto"
import { MessageResponse } from "../types/message-response.types"
import { postChangePasswordResponseMessage } from "../controllers/response-messages/post-change-password-response"

@Injectable()
export class AuthChangePasswordService {
    constructor(
        private userService: UserService,
    ) {}

    async postChangePassword(changePasswordDto: ChangePasswordDto, passwordTokenPayload: PasswordTokenPayload): Promise<MessageResponse> {
        const { password } = changePasswordDto
        const { userEmail } = passwordTokenPayload

        await this.userService.changeUserPassword(userEmail, password)

        return {
            message: postChangePasswordResponseMessage,
        }
    }

}
