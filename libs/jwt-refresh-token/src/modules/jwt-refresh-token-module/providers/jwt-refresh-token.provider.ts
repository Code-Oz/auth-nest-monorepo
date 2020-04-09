import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

import { RefreshTokenPayload } from "../types/refresh-token.payload"
import { JwtTokenDecoding } from "@app/lib-global-nest/tokens/jwt-token-decoding-abstract.class"

@Injectable()
export class JwtRefreshTokenProvider extends JwtTokenDecoding<RefreshTokenPayload> {
    constructor(
        jwtService: JwtService,
    ) {
        super(jwtService)
    }

    async provideRefreshToken(payload: RefreshTokenPayload) {
        return {
          refresh_token: this.jwtService.sign(payload),
        }
    }

    isValidPayloadToken(payload: string | { [key: string]: any }): payload is RefreshTokenPayload {
        if (!payload || typeof payload === "string") {
            return false
        }
        return !!payload.userId && !!payload.userEmail
    }
}
