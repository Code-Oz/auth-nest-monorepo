import { HttpStatus, HttpException } from "@nestjs/common"

const errorMessage = "Token is not available"

export class TokenNotAvailableException extends HttpException {
    constructor() {
      super(errorMessage, HttpStatus.FORBIDDEN)
    }
}
