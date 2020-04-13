import { HttpStatus, HttpException } from "@nestjs/common"

export const tokenNotAvailableError = "Token is not available"

export class TokenNotAvailableException extends HttpException {
    constructor() {
      super(tokenNotAvailableError, HttpStatus.FORBIDDEN)
    }
}
