import { TemplateMakerAbstract } from "./template-maker-abstract.class"

const TEMPLATE_NAME = "template-reset-password"
const SUBJECT_NAME = "Reset your password"

export interface ResetPasswordContext {
    email: string
    token: string
}

export class TemplateResetPassword extends TemplateMakerAbstract<ResetPasswordContext> {
    constructor(
        context: ResetPasswordContext,
        subject: string = SUBJECT_NAME,
        name: string = TEMPLATE_NAME,
    ) {
        super(
            context,
            subject,
            name,
        )
    }
    // Here you can add generate link function
}
