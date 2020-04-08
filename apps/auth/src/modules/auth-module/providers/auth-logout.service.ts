import { Injectable } from "@nestjs/common"

import { JwtRefreshTokenService } from "@app/jwt-refresh-token/modules/jwt-refresh-token-module/providers/jwt-refresh-token.service"
import { RefreshTokenDto } from "@app/jwt-refresh-token/modules/jwt-refresh-token-module/validations/refresh-token"
import { JwtRefreshTokenProvider } from "@app/jwt-refresh-token"
import { UserWrongCredentialException } from "../custom-errors/user-wrong-credential.exception"

@Injectable()
export class AuthLogoutService {
  constructor(
    private jwtRefreshTokenService: JwtRefreshTokenService,
    private jwtRefreshTokenProvider: JwtRefreshTokenProvider,
  ) {}

  async postLogout(refreshTokenDto: RefreshTokenDto): Promise<{ message: string }> {
    const { refreshToken } = refreshTokenDto
    const { userId, userEmail } = this.jwtRefreshTokenProvider.decodeToken(refreshToken)
    const isTokenAvailable = await this.jwtRefreshTokenService.isTokenAvailable(refreshToken, userId)
    if (!isTokenAvailable) {
      throw new UserWrongCredentialException()
    }
    await this.jwtRefreshTokenService.changeStatusToken(userEmail, refreshToken)

    return {
      message: "User successfully logout",
    }
  }

}
