import { HttpStatus, HttpException } from "@nestjs/common"

const errorMessage = "User don't have the roles to access to this ressource"

export class UserDontHaveRoles extends HttpException {
    constructor() {
        super(errorMessage, HttpStatus.FORBIDDEN)
    }
}
