import { Injectable } from "@nestjs/common"

import { EmailCreator } from "../email-creator"
import { ResetPasswordContext, TemplateResetPassword } from "../templates-maker"
import { EmailAuthor } from "../author"

const INVALID_LOGIN_ERROR_INTERNAL = "Invalid login: Username and Password not accepted, or may don't allow Less secure app, check this for more detail: https://support.google.com/mail/?p=BadCredentials"
const INVALID_LOGIN_ERROR_CLIENT = "Email cannot be send due to internal error"

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

        try {
            await emailCreator.sendEmail(to)
        } catch (error) {
            console.error(INVALID_LOGIN_ERROR_INTERNAL)
            throw new Error(INVALID_LOGIN_ERROR_CLIENT)
        }
    }
}
