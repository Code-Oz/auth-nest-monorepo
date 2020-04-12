import { Injectable } from "@nestjs/common"

import { JwtRefreshTokenService, RefreshTokenPayload, TokenNotAvailableException } from "@app/jwt-refresh-token"

@Injectable()
export class AuthLogoutService {
  constructor(
    private jwtRefreshTokenService: JwtRefreshTokenService,
  ) {}

  async postLogout(refreshTokenPayload: RefreshTokenPayload): Promise<{ message: string }> {
    const { userEmail, refreshTokenId } = refreshTokenPayload
    const isTokenAvailable = await this.jwtRefreshTokenService.isTokenAvailable(refreshTokenId)
    if (!isTokenAvailable) {
      throw new TokenNotAvailableException()
    }
    await this.jwtRefreshTokenService.changeStatusToken(userEmail, refreshTokenId)

    return {
      message: "User successfully logout",
    }
  }

}
