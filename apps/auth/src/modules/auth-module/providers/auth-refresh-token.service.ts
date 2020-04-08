import { Injectable } from "@nestjs/common"

import { JwtAccessTokenProvider } from "@app/jwt-access-token"
import { JwtRefreshTokenProvider, TokenNotAvailableException, JwtRefreshTokenService } from "@app/jwt-refresh-token"

import { ProvidersToken } from "../types/providers-token.type"

@Injectable()
export class AuthRefreshTokenService {
  constructor(
    private jwtAccessTokenProvider: JwtAccessTokenProvider,
    private jwtRefreshTokenProvider: JwtRefreshTokenProvider,
    private jwtRefreshTokenService: JwtRefreshTokenService,
  ) {}

  async postAccessToken(refreshToken: string): Promise<ProvidersToken> {
    const { userId, userEmail } = this.jwtRefreshTokenProvider.decodeToken(refreshToken)
    const isTokenAvailable = await this.jwtRefreshTokenService.isTokenAvailable(refreshToken, userId)

    if (!isTokenAvailable) {
      throw new TokenNotAvailableException()
    }

    const { access_token } = await this.jwtAccessTokenProvider.provideAccessToken({ userId, userEmail })

    return {
      access_token,
      refresh_token: refreshToken,
    }
  }
}
