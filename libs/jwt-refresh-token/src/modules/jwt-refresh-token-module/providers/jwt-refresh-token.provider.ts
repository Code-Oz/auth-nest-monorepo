import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

import { RefreshTokenPayload } from "../types/refresh-token.payload"

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

}
