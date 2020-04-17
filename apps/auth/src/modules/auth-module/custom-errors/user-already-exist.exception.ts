import { HttpStatus, HttpException } from "@nestjs/common"

const errorMessage = "User already register"

export class UserAlreadyExistException extends HttpException {
    constructor() {
        super(errorMessage, HttpStatus.CONFLICT)
    }
}
