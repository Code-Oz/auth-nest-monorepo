import { JwtService } from "@nestjs/jwt"
import { WrongPayloadTokenException } from "../customs-errors"
// Move from jwt-refresh-token to gloabl module

type DecodeType = string | { [key: string]: any }

export abstract class JwtTokenDecoding<TPayload> {
    constructor(
        protected jwtService: JwtService,
    ) {}

    decodeToken(refreshToken: string): TPayload {
        const payload: DecodeType = this.jwtService.decode(refreshToken, { json: true })
        if (!this.isValidPayloadToken(payload)) {
            throw new WrongPayloadTokenException()
        }
        return payload
    }

    public abstract isValidPayloadToken(token: DecodeType): token is TPayload
}
