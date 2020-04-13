import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

import { JwtPasswordTokenProvider } from "@app/jwt-password-token"
import { EmailFactoryService } from "@app/email-factory"

import { UserEmailDto } from "../validations/user-email.dto"
import { MessageResponse } from "../types/message-response.types"

@Injectable()
export class AuthResetPasswordService {
  constructor(
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

      const resetPasswordToken = await this.jwtPasswordTokenProvider.providePasswordToken({ userEmail: userEmailDto.email })

      return await this.emailFactoryService.sendEmailResetPassword(
          userEmailDto.email,
          {
            email: userEmailDto.email,
            token: resetPasswordToken.password_token,
          },
          {
            user: emailSender, pass: passSender,
          },
      )
  }

}
