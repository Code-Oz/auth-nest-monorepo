import { createTransport } from "nodemailer"
import * as Mail from "nodemailer/lib/mailer"
const hbs = require("nodemailer-express-handlebars")

import { EmailAuthor } from "../author/email-author.class"
import { TemplateMakerAbstract } from "../templates-maker/template-maker-abstract.class"

export class EmailCreator<TContext extends { [key: string]: any }> {
    private transporter: Mail

    constructor(
        private emailAuthor: EmailAuthor,
        private template: TemplateMakerAbstract<TContext>,
    ) {
        this.transporter = createTransport({
            service: emailAuthor.getAuthor().service,
            auth: {
              user: emailAuthor.getAuthor().auth.user,
              pass: emailAuthor.getAuthor().auth.pass,
            },
        })
        this.transporter.use("compile", hbs(template.getHandleBarsOptions()))
    }

    public async sendEmail(to: string, subject?: string): Promise<void> {
        const mailOptions = {
            to,
            subject: subject || this.template.getSubject(),
            template: this.template.getName(),
            context: this.template.getContext(),
        }
        await this.transporter.sendMail(mailOptions)
    }

}
