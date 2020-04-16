import { resolve } from "path"

type HtmlExtension = ".html"
const HTML_EXTENSION: HtmlExtension = ".html"

interface HandleBarsOptions {
    viewEngine: {
        extName: HtmlExtension,
        partialsDir: string,
        layoutsDir: string,
        defaultLayout: string,
    }
    viewPath: string
    extName: HtmlExtension
}

export abstract class TemplateMakerAbstract<TContext extends { [key: string]: any }> {
    constructor(
        // Variables for template
        protected context: TContext,
        protected subject: string,
        protected name: string,
        protected templatePath: string = resolve("./templates/"),
        protected extension: HtmlExtension = HTML_EXTENSION,
    ) {}

    public getHandleBarsOptions(): HandleBarsOptions {
        return {
            viewEngine: {
                extName: this.extension,
                partialsDir: this.templatePath,
                layoutsDir: this.templatePath,
                defaultLayout: this.name + this.extension,
            },
            viewPath: this.templatePath,
            extName: this.extension,
        }
    }

    public getSubject(): string {
        return this.subject
    }

    public getName(): string {
        return this.name
    }

    public getContext(): TContext {
        return this.context
    }
}
