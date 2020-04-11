import { Injectable } from "@nestjs/common"

import { EmailCreator } from "../email-creator/email-creator.class"
import { ResetPasswordContext, TemplateResetPassword } from "../templates-maker/template-reset-password.class"
import { EmailAuthor } from "../author/email-author.class"

type UserEmail = string
interface EmailSender {
    user: string
    pass: string
}

@Injectable()
export class EmailFactoryService {

    async sendEmailResetPassword(to: UserEmail, context: ResetPasswordContext, emailSender: EmailSender): Promise<{ message: string }> {
        const emailAuthor = new EmailAuthor(emailSender.user, emailSender.pass)
        const templateResetEmail = new TemplateResetPassword(context)

        const emailCreator = new EmailCreator(emailAuthor, templateResetEmail)

        await emailCreator.sendEmail(to)

        return {
            message: `An email has been send to ${to}, if email exist`,
        }
    }
}
