import { Injectable } from "@nestjs/common"

import { JwtRefreshTokenProvider, JwtRefreshTokenService } from "@app/jwt-refresh-token"
import { UserWrongCredentialException } from "../custom-errors/user-wrong-credential.exception"
import { RefreshTokenDto } from "../validations/refresh-token.dto"

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
