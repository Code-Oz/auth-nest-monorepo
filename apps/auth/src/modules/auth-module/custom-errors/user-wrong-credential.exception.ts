import { HttpStatus, HttpException } from "@nestjs/common"

const errorMessage = "Wrong credential"

export class UserWrongCredentialException extends HttpException {
    constructor() {
      super(errorMessage, HttpStatus.FORBIDDEN)
    }
}
