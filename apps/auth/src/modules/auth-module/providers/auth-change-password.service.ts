import { Injectable } from "@nestjs/common"

import { JwtPasswordTokenProvider } from "@app/jwt-password-token"
import { UserService } from "@app/user"

import { ChangePasswordDto } from "../validations/change-password.tdo"

@Injectable()
export class AuthChangePasswordService {
  constructor(
    private userService: UserService,
    private jwtPasswordTokenProvider: JwtPasswordTokenProvider,
  ) {}

  async postChangePassword(changePasswordDto: ChangePasswordDto): Promise<{ message: string }> {
    const { changePasswordToken, password } = changePasswordDto
    const { userEmail } = this.jwtPasswordTokenProvider.decodeToken(changePasswordToken)

    await this.userService.changeUserPassword(userEmail, password)

    return {
      message: "User password has been changed !",
    }
  }

}
