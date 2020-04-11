type ServiceType = "gmail"
interface AuthorProvider {
    service: ServiceType,
    auth: {
        user: string,
        pass: string,
    },
}

export class EmailAuthor {
    constructor(
        private user: string,
        private pass: string,
        private service: ServiceType = "gmail",
    ) {}

    public getAuthor(): AuthorProvider {
        return {
            service: this.service,
            auth: {
                user: this.user,
                pass: this.pass,
            },
        }
    }
}
