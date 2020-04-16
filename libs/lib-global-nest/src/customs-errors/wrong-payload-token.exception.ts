import { HttpStatus, HttpException } from "@nestjs/common"

const errorMessage = "Token is not conform"

export class WrongPayloadTokenException extends HttpException {
    constructor() {
        super(errorMessage, HttpStatus.BAD_REQUEST)
    }
}
