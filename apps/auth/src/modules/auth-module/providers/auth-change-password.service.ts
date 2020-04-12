import { Injectable } from "@nestjs/common"

import { PasswordTokenPayload } from "@app/jwt-password-token"
import { UserService } from "@app/user"

import { ChangePasswordDto } from "../validations/change-password.tdo"

@Injectable()
export class AuthChangePasswordService {
  constructor(
    private userService: UserService,
  ) {}

  async postChangePassword(changePasswordDto: ChangePasswordDto, passwordTokenPayload: PasswordTokenPayload): Promise<{ message: string }> {
    const { password } = changePasswordDto
    const { userEmail } = passwordTokenPayload

    await this.userService.changeUserPassword(userEmail, password)

    return {
      message: "User password has been changed !",
    }
  }

}
