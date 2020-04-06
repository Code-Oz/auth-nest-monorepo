import { Injectable, HttpException } from "@nestjs/common"

import { UserService } from "@app/user"
import { JwtAccessTokenProvider } from "@app/jwt-access-token"
import { JwtRefreshTokenProvider } from "@app/jwt-refresh-token"

import { UserConnectionDto } from "../validations/user-connection"
import { UserAlreadyExistException } from "../custom-errors/user-already-exist.exception"
import { JwtRefreshTokenService } from "@app/jwt-refresh-token/modules/jwt-refresh-token-module/providers/jwt-refresh-token.service"

@Injectable()
export class AuthService {
  constructor(
    private jwtAccessTokenProvider: JwtAccessTokenProvider,
    private jwtRefreshTokenProvider: JwtRefreshTokenProvider,
    private jwtRefreshTokenService: JwtRefreshTokenService,
    private userService: UserService,
  ) {}

  getHello(): string {
    return "Hello World!"
  }

  async register(userConnectionDto: UserConnectionDto): Promise<object> {
    const { email, password } = userConnectionDto
    const isExistingUser = await this.userService.isExistUser(email)
    const isTokenExist = await this.jwtRefreshTokenService.isTokenExist(email)

    if (isExistingUser || isTokenExist) {
      throw new UserAlreadyExistException()
    }

    const createdUser = await this.userService.createUser({ email, password })
    const refreshToken = await this.jwtRefreshTokenProvider.provideRefreshToken({
      userId: createdUser._id,
      userEmail: createdUser.email,
    })
    const accessToken = await this.jwtAccessTokenProvider.provideAccessToken({
      userId: createdUser._id,
      userEmail: createdUser.email,
    })

    await this.jwtRefreshTokenService.saveToken({
      email: createdUser.email,
      userId: createdUser._id,
      refresh_token: refreshToken.refresh_token,
      isAvailable: true,
    })

    return {
      ...refreshToken,
      ...accessToken,
    }
  }
}
