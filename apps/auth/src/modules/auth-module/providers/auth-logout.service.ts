import { Injectable } from "@nestjs/common"

import { JwtRefreshTokenService, RefreshTokenPayload, TokenNotAvailableException } from "@app/jwt-refresh-token"

import { MessageResponse } from "../types/message-response.types"
import { postLogoutResponseMessage } from "../controllers/response-messages/post-logout-response"

@Injectable()
export class AuthLogoutService {
    constructor(
        private jwtRefreshTokenService: JwtRefreshTokenService,
    ) {}

    async postLogout(refreshTokenPayload: RefreshTokenPayload): Promise<MessageResponse> {
        const { userEmail, refreshTokenId } = refreshTokenPayload
        const isTokenAvailable = await this.jwtRefreshTokenService.isTokenAvailable(refreshTokenId)

        if (!isTokenAvailable) {
        throw new TokenNotAvailableException()
        }

        await this.jwtRefreshTokenService.changeStatusToken(userEmail, refreshTokenId)

        return {
        message: postLogoutResponseMessage,
        }
    }
}
