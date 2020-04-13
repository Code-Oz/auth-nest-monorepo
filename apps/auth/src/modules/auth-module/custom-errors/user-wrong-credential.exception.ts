import { HttpStatus, HttpException } from "@nestjs/common"

export const wrongCredentialError = "Wrong credential"

export class UserWrongCredentialException extends HttpException {
    constructor() {
      super(wrongCredentialError, HttpStatus.FORBIDDEN)
    }
}
