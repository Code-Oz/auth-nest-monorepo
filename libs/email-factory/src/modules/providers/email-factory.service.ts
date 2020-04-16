import { Injectable } from "@nestjs/common"

import { EmailCreator } from "../email-creator"
import { ResetPasswordContext, TemplateResetPassword } from "../templates-maker"
import { EmailAuthor } from "../author"

type UserEmail = string
interface EmailSender {
    user: string
    pass: string
}

@Injectable()
export class EmailFactoryService {
    async sendEmailResetPassword(to: UserEmail, context: ResetPasswordContext, emailSender: EmailSender): Promise<void> {
        const emailAuthor = new EmailAuthor(emailSender.user, emailSender.pass)
        const templateResetEmail = new TemplateResetPassword(context)
        const emailCreator = new EmailCreator(emailAuthor, templateResetEmail)

        await emailCreator.sendEmail(to)
    }
}
