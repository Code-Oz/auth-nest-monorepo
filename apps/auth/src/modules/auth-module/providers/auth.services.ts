import { Injectable, HttpException } from "@nestjs/common"

import { UserService } from "@app/user"
import { JwtAccessTokenProvider } from "@app/jwt-access-token"
import { JwtRefreshTokenProvider } from "@app/jwt-refresh-token"

import { UserConnectionDto } from "../validations/user-connection"
import { UserAlreadyExistException } from "../custom-errors/user-already-exist.exception"

@Injectable()
export class AuthService {
  constructor(
    private jwtAccessTokenProvider: JwtAccessTokenProvider,
    private jwtRefreshTokenProvider: JwtRefreshTokenProvider,
    private userService: UserService,
  ) {}

  getHello(): string {
    return "Hello World!"
  }

  async register(userConnectionDto: UserConnectionDto): Promise<object> {
    const { email, password } = userConnectionDto
    const isExistingUser = await this.userService.isExistUser(email)

    if (isExistingUser) {
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

    return {
      ...refreshToken,
      ...accessToken,
    }
  }
}
