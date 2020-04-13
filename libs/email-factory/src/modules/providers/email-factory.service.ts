import { Injectable } from "@nestjs/common"

import { EmailCreator } from "../email-creator/email-creator.class"
import { ResetPasswordContext, TemplateResetPassword } from "../templates-maker/template-reset-password.class"
import { EmailAuthor } from "../author/email-author.class"
import { MessageResponse } from "apps/auth/src/modules/auth-module/types/message-response.types"
import { postResetPasswordResponseMessage } from "apps/auth/src/modules/auth-module/controllers/response-messages/post-reset-password-response"

type UserEmail = string
interface EmailSender {
    user: string
    pass: string
}

@Injectable()
export class EmailFactoryService {

    async sendEmailResetPassword(to: UserEmail, context: ResetPasswordContext, emailSender: EmailSender): Promise<MessageResponse> {
        const emailAuthor = new EmailAuthor(emailSender.user, emailSender.pass)
        const templateResetEmail = new TemplateResetPassword(context)

        const emailCreator = new EmailCreator(emailAuthor, templateResetEmail)

        await emailCreator.sendEmail(to)

        return {
            message: postResetPasswordResponseMessage(to),
        }
    }
}
