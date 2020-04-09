import { Injectable } from "@nestjs/common"

import { UserService, UserCredentialService, UserDocument } from "@app/user"
import { JwtAccessTokenProvider } from "@app/jwt-access-token"
import { JwtRefreshTokenProvider, JwtRefreshTokenService } from "@app/jwt-refresh-token"

import { ProvidersToken } from "../types/providers-token.type"
import { UserConnectionDto } from "../validations/user-connection.dto"
import { UserWrongCredentialException } from "../custom-errors/user-wrong-credential.exception"

@Injectable()
export class AuthLoginService {
  constructor(
    private userService: UserService,
    private userCredentialService: UserCredentialService,
    private jwtAccessTokenProvider: JwtAccessTokenProvider,
    private jwtRefreshTokenProvider: JwtRefreshTokenProvider,
    private jwtRefreshTokenService: JwtRefreshTokenService,
  ) {}

  async postLogin(userConnectionDto: UserConnectionDto): Promise<ProvidersToken> {
    const { email } = userConnectionDto

    const user = await this.userService.findUserByEmail(email)

    if (!user) {
        throw new UserWrongCredentialException()
    }

    this.checkingCredential(userConnectionDto, user)

    await this.jwtRefreshTokenService.makeSingletonConnection(email)

    return await this.provideToken(user)
  }

  private checkingCredential(userConnectionDto: UserConnectionDto, user: UserDocument): void {
    const passwordFromRequest = userConnectionDto.password
    const passwordFromDb = user.password
    const isCredentialCorrect = this.userCredentialService.checkingCredentialPassword(
        passwordFromRequest,
        passwordFromDb,
    )

    if (!isCredentialCorrect) {
        throw new UserWrongCredentialException()
    }
  }

  private async provideToken(user: UserDocument): Promise<ProvidersToken> {
    const refreshToken = await this.jwtRefreshTokenProvider.provideRefreshToken({
        userId: user.id,
        userEmail: user.email,
    })
    const accessToken = await this.jwtAccessTokenProvider.provideAccessToken({
        userId: user.id,
        userEmail: user.email,
    })

    await this.jwtRefreshTokenService.saveToken({
        email: user.email,
        userId: user.id,
        refresh_token: refreshToken.refresh_token,
        isAvailable: true,
    })

    return {
        refresh_token: refreshToken.refresh_token,
        access_token: accessToken.access_token,
    }
  }
}
