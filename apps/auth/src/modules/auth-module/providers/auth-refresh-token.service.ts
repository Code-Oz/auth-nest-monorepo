import { Injectable } from "@nestjs/common"

import { JwtAccessTokenProvider } from "@app/jwt-access-token"
import { JwtRefreshTokenProvider, JwtRefreshTokenService, TokenNotAvailableException } from "@app/jwt-refresh-token"

import { ProvidersToken } from "../types/providers-token.type"
import { RefreshTokenDto } from "../validations/refresh-token.dto"

@Injectable()
export class AuthRefreshTokenService {
  constructor(
    private jwtAccessTokenProvider: JwtAccessTokenProvider,
    private jwtRefreshTokenProvider: JwtRefreshTokenProvider,
    private jwtRefreshTokenService: JwtRefreshTokenService,
  ) {}

  async postAccessToken(refreshTokenDto: RefreshTokenDto): Promise<ProvidersToken> {
    const { refreshToken } = refreshTokenDto
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
