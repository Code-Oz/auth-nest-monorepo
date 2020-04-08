import { Injectable } from "@nestjs/common"

import { JwtAccessTokenProvider } from "@app/jwt-access-token"
import { JwtRefreshTokenProvider } from "@app/jwt-refresh-token"
import { TokenNotAvailableException } from "@app/jwt-refresh-token/modules/jwt-refresh-token-module/custom-errors/token-not-available.exception"

import { JwtRefreshTokenService } from "@app/jwt-refresh-token/modules/jwt-refresh-token-module/providers/jwt-refresh-token.service"
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
