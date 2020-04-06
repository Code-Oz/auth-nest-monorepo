import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

import { RefreshTokenPayload } from "../types/refresh-token.payload"
import { WrongPayloadTokenException } from "../custom-errors/wrong-payload-token.exception"

@Injectable()
export class JwtRefreshTokenProvider {
    constructor(
        private jwtService: JwtService,
    ) {}

    async provideRefreshToken(payload: RefreshTokenPayload) {
        return {
          refresh_token: this.jwtService.sign(payload),
        }
    }

    decodeToken(refreshToken: string): RefreshTokenPayload {
        const payload = this.jwtService.decode(refreshToken, { json: true })
        if (!this.isValidPayloadToken(payload)) {
            throw new WrongPayloadTokenException()
        }
        const { userId, userEmail } = payload
        return {
            userId,
            userEmail,
        }
    }

    isValidPayloadToken(payload: string | { [key: string]: any }): payload is RefreshTokenPayload {
        if (!payload || typeof payload === "string") {
            return false
        }
        return !!payload.userId && !!payload.userEmail
    }
}
