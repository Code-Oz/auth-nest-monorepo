import { Injectable } from "@nestjs/common"

import { JwtRefreshTokenService, RefreshTokenPayload } from "@app/jwt-refresh-token"
import { UserWrongCredentialException } from "../custom-errors/user-wrong-credential.exception"

@Injectable()
export class AuthLogoutService {
  constructor(
    private jwtRefreshTokenService: JwtRefreshTokenService,
  ) {}

  async postLogout(refreshTokenPayload: RefreshTokenPayload): Promise<{ message: string }> {
    const { userEmail, refreshTokenId } = refreshTokenPayload
    const isTokenAvailable = await this.jwtRefreshTokenService.isTokenAvailable(refreshTokenId)
    if (!isTokenAvailable) {
      throw new UserWrongCredentialException()
    }
    await this.jwtRefreshTokenService.changeStatusToken(userEmail, refreshTokenId)

    return {
      message: "User successfully logout",
    }
  }

}
