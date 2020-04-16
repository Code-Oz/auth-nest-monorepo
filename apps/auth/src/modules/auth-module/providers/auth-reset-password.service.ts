import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

import { UserService } from "@lib/user"
import { JwtPasswordTokenProvider } from "@lib/jwt-password-token"
import { EmailFactoryService } from "@lib/email-factory"

import { UserEmailDto } from "../validations/user-email.dto"
import { MessageResponse } from "../types/message-response.types"
import { postResetPasswordResponseMessage } from "../controllers/response-messages/post-reset-password-response"

@Injectable()
export class AuthResetPasswordService {
    constructor(
        private userService: UserService,
        private emailFactoryService: EmailFactoryService,
        private configService: ConfigService,
        private jwtPasswordTokenProvider: JwtPasswordTokenProvider,
    ) {}

    async postResetPassword(userEmailDto: UserEmailDto): Promise<MessageResponse> {
        const emailSender = this.configService.get<string>("EMAIL_SENDER")
        const passSender = this.configService.get<string>("PASSWORD_SENDER")

        if (!emailSender || !passSender) {
            throw new Error("Environment variable don't exist for EMAIL_SENDER or PASSWORD_SENDER")
        }

        const { email } = userEmailDto
        const isUserRegistered = await this.userService.isExistUser(email)

        if (isUserRegistered) {
            const resetPasswordToken = await this.jwtPasswordTokenProvider.providePasswordToken({ userEmail: email })

            await this.emailFactoryService.sendEmailResetPassword(
                email,
                {
                email: email,
                token: resetPasswordToken.password_token,
                },
                {
                user: emailSender, pass: passSender,
                },
            )
        }

        return {
            message: postResetPasswordResponseMessage(email),
        }
    }
}
