import { Injectable } from "@nestjs/common"

import { JwtAccessTokenProvider } from "@lib/jwt-access-token"
import { JwtRefreshTokenService, TokenNotAvailableException, RefreshTokenPayload } from "@lib/jwt-refresh-token"

import { AccessToken } from "../types/access-token.type"

@Injectable()
export class AuthRefreshTokenService {
    constructor(
        private jwtAccessTokenProvider: JwtAccessTokenProvider,
        private jwtRefreshTokenService: JwtRefreshTokenService,
    ) {}

    public async postAccessToken(refreshTokenPayload: RefreshTokenPayload): Promise<AccessToken> {
        const { userId, userEmail, refreshTokenId, userRoles } = refreshTokenPayload
        const isTokenAvailable = await this.jwtRefreshTokenService.isTokenAvailable(refreshTokenId)

        if (!isTokenAvailable) {
            throw new TokenNotAvailableException()
        }

        const { access_token } = await this.jwtAccessTokenProvider.provideAccessToken({
            userId,
            userEmail,
            userRoles,
        })

        return {
            access_token,
        }
    }
}
