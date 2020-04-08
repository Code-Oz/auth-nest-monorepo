import { Injectable } from "@nestjs/common"

import { UserService } from "@app/user"
import { JwtRefreshTokenService } from "@app/jwt-refresh-token"

import { UserConnectionDto } from "../validations/user-connection"
import { UserAlreadyExistException } from "../custom-errors/user-already-exist.exception"

@Injectable()
export class AuthRegisterService {
  constructor(
    private jwtRefreshTokenService: JwtRefreshTokenService,
    private userService: UserService,
  ) {}

  async postRegister(userConnectionDto: UserConnectionDto): Promise<{ message: string }> {
    const { email, password } = userConnectionDto
    const isExistingUser = await this.userService.isExistUser(email)
    const isTokenExist = await this.jwtRefreshTokenService.isTokenExist(email)

    if (isExistingUser || isTokenExist) {
      throw new UserAlreadyExistException()
    }

    await this.userService.createUser({ email, password })

    return {
      message: "User has been registered !",
    }
  }

}
